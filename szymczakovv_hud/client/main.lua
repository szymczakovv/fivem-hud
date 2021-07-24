local isOpen, isPaused
local pause_using = false
local prop, model = 0, -1038739674
local dict, anim = 'cellphone@', 'cellphone_text_in'

ESX = nil
CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Wait(250)
	end
	while ESX.GetPlayerData().job == nil do
		Citizen.Wait(10)
	end

	PlayerData = ESX.GetPlayerData()
end)

AddEventHandler('playerSpawned', function()
	Wait(5000)
	SendNUIMessage({ action = 'startUp' })
end)

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() == resourceName) then
		Wait(2000)
		SendNUIMessage({ action = 'startUp' })
	end
end)

CreateThread(function()
	while true do
		Wait(10)
			SendNUIMessage({action = "startup-belt"})
		break
	end
end)

RegisterNetEvent('szymczakovv_hud:setVoiceProx')
AddEventHandler('szymczakovv_hud:setVoiceProx', function(val)
	SendNUIMessage({
		action = "microphone",
		microphone = val
	})
end)

CreateThread(function()
	while isOpen do
        DisableControlAction(0, 322, true)
    end
	
	while true do
		local ped 				= PlayerPedId()
		local player 			= PlayerId()
		local health 			= GetEntityHealth(ped) - 100
		local oxygen 			= GetPlayerUnderwaterTimeRemaining(player) * 10
		local armor 			= GetPedArmour(ped)
		local stamina 			= 100 - GetPlayerSprintStaminaRemaining(player)

		if IsEntityDead(ped) then
			health = 0
		end

		TriggerEvent('esx_status:getStatus', 'hunger', function(status)
			hunger = status.val / 10000/3.5
		end)

		TriggerEvent('esx_status:getStatus', 'thirst', function(status)
			thirst = status.val / 10000/3.5
		end)
		
		SendNUIMessage({
			action = "hud",
			health = health,
			armor = armor,
			stamina = stamina,
			hunger = hunger,
			thirst = thirst,
			oxygen = oxygen,
		})


		if IsPauseMenuActive() and not isPaused then
			isPaused = true
			SendNUIMessage({action = "isPaused"})
		elseif not IsPauseMenuActive() and isPaused then
			isPaused = false
			SendNUIMessage({action = "notPaused"})
		end

		if not pause_using then
			if not IsPedInAnyVehicle(PlayerPedId(), false) then
				SendNUIMessage({action = "hide_belt"})
			else
				SendNUIMessage({action = "show_belt"})
			end

			if not IsPedSwimmingUnderWater(PlayerPedId()) then
				SendNUIMessage({action = "hide_oxygen"})
			else
				SendNUIMessage({action = "show_oxygen"})
			end

			if GetPedArmour(PlayerPedId()) == 0 then
				SendNUIMessage({action = "hide_armor"})
			else
				SendNUIMessage({action = "show_armor"})
			end

			if GetPlayerSprintStaminaRemaining(PlayerId()) == 0 then
				SendNUIMessage({action = "hide_stamina"})
			else
				SendNUIMessage({action = "show_stamina"})
			end
		end
		Wait(400)
	end
end)

CreateThread(function()
	while true do
		Citizen.Wait(0)
		local ped = PlayerPedId()
		if IsPedInAnyVehicle(ped, false) then
			local vehicle = GetVehiclePedIsIn(ped, false)
			if vehicle ~= 0 and IsCar(vehicle, true) then
				if IsControlJustReleased(0, 29) then
					if exports['szymczakovv_blackout']:seatbeltState() == false then	
						SendNUIMessage({
							action = "belt",
							belt = 0
						})
					elseif exports['szymczakovv_blackout']:seatbeltState() == true then	
						SendNUIMessage({
							action = "belt",
							belt = 100
						})
					end
				end
			end
		end
	end
end)

RegisterCommand('hud', function()
	if not isOpen and not isPaused then
		isOpen = true
		SendNUIMessage({ action = 'show' })
		SetNuiFocus(true, true)
		startAnim()
		pause_using = true
		Wait(200)
		SendNUIMessage({action = "show_oxygen"})
		SendNUIMessage({action = "show_belt"})
		SendNUIMessage({action = "show_armor"})
		SendNUIMessage({action = "show_stamina"})
	end
end)

RegisterNUICallback('close', function()
	if isOpen then
		isOpen = false
		pause_using = false
		SetNuiFocus(false, false)
		stopAnim()
	end
end)

RegisterKeyMapping('hud', 'Konfiguracja  Interfejsu', 'keyboard', '')

function IsCar(v, ignoreBikes)
	if ignoreBikes and IsThisModelABike(GetEntityModel(v)) then
		return false
	end

	local vc = GetVehicleClass(v)
	return (vc >= 0 and vc <= 12) or vc == 17 or vc == 18 or vc == 20
end

function startAnim()
	local ped = PlayerPedId()
	if IsPedInAnyVehicle(ped, false) then
		dict = "anim@cellphone@in_car@ps"
	end

	RequestModel(model)
	while not HasModelLoaded(model) do
		Wait(10)
	end
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
		Wait(10)
	end

	prop = CreateObject(model, 1.0, 1.0, 1.0, 1, 1, 0)
	local bone = GetPedBoneIndex(ped, 28422)
	local isUnarmed = GetCurrentPedWeapon(ped, 1)
	if isUnarmed then
		SetCurrentPedWeapon(ped, GetHashKey("WEAPON_UNARMED"), true)
		AttachEntityToEntity(prop, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	else
		AttachEntityToEntity(prop, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
	end
	TaskPlayAnim(ped, dict, anim, 3.0, -1, -1, 50, 0, false, false, false)
end

function stopAnim()
	if (prop ~= 0) then
		local ped = PlayerPedId()
		DeleteEntity(prop)
		StopAnimTask(ped, dict, anim, 1.0)
		prop = 0
	end
end
ESX = nil

CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

CreateThread(function()
    while true do
        Citizen.Wait(190)
        local player = PlayerPedId()

        local veh = GetVehiclePedIsIn(player, false)
        if IsVehicleEngineOn(veh) then          

            if not uiopen then
                uiopen = true
                SendNUIMessage({
                  open = 1,
                }) 
            end

            Mph = math.ceil(GetEntitySpeed(GetVehiclePedIsIn(player, false)) * 3.6)
			
            local blip = GetFirstBlipInfoId(8)
            local distance = ""
            if (blip ~= 0) then
                local coord = GetBlipCoords(blip)
                distance = "➥ "..(CalculateTravelDistanceBetweenPoints(GetEntityCoords(Citizen.InvokeNative(0x4899CB088EDF59B8,-1)), coord)/1000).." KM"
            elseif distance == tonumber(0) then
                distance = ""
            end

            SendNUIMessage({
              open = 2,
              mph = Mph,
              time = distance,
            }) 
        else

            if uiopen and not compass_on then
                SendNUIMessage({
                  open = 3,
                }) 
                uiopen = false
            end
        end
    end
end)
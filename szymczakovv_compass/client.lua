Config = {
	Minimap = {
		Rect = {
			['minimap'] = {
				Pos = {
					x = -0.0045,
					y = 0.002
				},
				Size = {
					x = 0.15,
					y = 0.188888
				}
			},
			['minimap_mask'] = {
				Pos = {
					x = 0.02,
					y = 0.032
				},
				Size = {
					x = 0.111,
					y = 0.159
				}
			},
			['minimap_blur'] = {
				Pos = {
					x = -0.03,
					y = 0.022
				},
				Size = {
					x = 0.266,
					y = 0.237
				}
			}
		},
		Round = {
			['minimap'] = {
				Pos = {
					x = -0.019,
					y = -0.020
				},
				Size = {
					x = 0.183,
					y = 0.32
				}
			},
			['minimap_mask'] = {
				Pos = {
					x = -0.02,
					y = -0.022
				},
				Size = {
					x = 0.183,
					y = 0.32
				}
			},
			['minimap_blur'] = {
				Pos = {
					x = -0.018,
					y = 0.0
				},
				Size = {
					x = 0.256,
					y = 0.337
				}
			}
		},
		RoundVehicle = {
			['minimap'] = {
				Pos = {
					x = -0.019,
					y = -0.020
				},
				Size = {
					x = 0.183,
					y = 0.32
				}
			},
			['minimap_mask'] = {
				Pos = {
					x = -0.02,
					y = -0.022
				},
				Size = {
					x = 0.183,
					y = 0.32
				}
			},
			['minimap_blur'] = {
				Pos = {
					x = -0.018,
					y = 0.0
				},
				Size = {
					x = 0.256,
					y = 0.337
				}
			}
		},
	},
}



local Ped = {
	Id = nil,
	Vehicle = false,
}

local HUD = {
	Minimap = nil,
	Masked = false,
	Ready = false,
	Hide = false,
	Pause = false,
	LastBuild = 'minimap',
	Blip = nil,
	State = false,
	Offset = Config.Minimap.Rect['minimap'],
}

local setScriptGfxAlign = SetScriptGfxAlign
local getScriptGfxPosition = GetScriptGfxPosition
local resetScriptGfxAlign = ResetScriptGfxAlign
local resolutionFunc = GetActiveScreenResolution
local aspectFunc = GetAspectRatio
local radarFunc = IsRadarHidden
local nuiProxy = SendNUIMessage
local _in = Citizen.InvokeNative
local ptr = Citizen.PointerValueInt()

local function RebuildRadar(data, clip, minimap)
	if clip == 1 then
		if not HUD.Masked then
			AddReplaceTexture("platform:/textures/graphics", "radarmasksm", "MAP", "radar")
			HUD.Masked = true
		end
	elseif HUD.Masked then
		RemoveReplaceTexture("platform:/textures/graphics", "radarmasksm")
		HUD.Masked = false
	end

	SetMinimapClipType(clip)
	for k, v in pairs(data) do
		SetMinimapComponentPosition(k, 'L', 'B', v.Pos.x, v.Pos.y, v.Size.x, v.Size.y)
	end

	local m = RequestScaleformMovie("minimap")
	HUD.Offset = data['minimap']

	SetRadarBigmapEnabled(true, false)
	if not minimap then
		Citizen.Wait(0)
		SetRadarBigmapEnabled(false, false)
	end

	return m
end

AddEventHandler('playerSpawned', function()
	RebuildRadar(Config.Minimap.Round, 1, false)
end)

local function CheckRadar(state)
	HUD.State = radarFunc() ~= 1
	if HUD.State ~= state then
		DisplayRadar(state)
		if state then
			nuiProxy({type = 'rebuild', value = HUD.LastBuild})
		else
			nuiProxy({type = 'rebuild', value = 'freeroam'})
		end
	end
end

local function GetMinimapAnchor(nui)
	local offset = HUD.Offset
	if not HUD.State then
		offset = Config.Minimap.Rect['minimap']
	end

	setScriptGfxAlign(string.byte('L'), string.byte('B'))
	local minimapTopX, minimapTopY = getScriptGfxPosition(offset.Pos.x, offset.Pos.y - offset.Size.y)
	local minimapBottomX, minimapBottomY = getScriptGfxPosition(offset.Pos.x + offset.Size.x, offset.Pos.y)

	resetScriptGfxAlign()
	if not nui then
		return { x = minimapTopX, y = minimapTopY }
	end

	local w, h = resolutionFunc()
	local x, y = w * minimapTopX, h * minimapTopY
	return { x = x, y = y, width = w * minimapBottomX - x, height = h * minimapBottomY - y, a = aspectFunc() }
end

CreateThread(function()
	while not NetworkIsSessionActive() do
		Citizen.Wait(50)
	end

	RequestStreamedTextureDict("MAP")
	while not HasStreamedTextureDictLoaded("MAP") do
		Citizen.Wait(0)
	end

    SetMapZoomDataLevel(0, 0.96, 0.9, 0.08, 0.0, 0.0)
    SetMapZoomDataLevel(1, 1.6, 0.9, 0.08, 0.0, 0.0)
    SetMapZoomDataLevel(2, 8.6, 0.9, 0.08, 0.0, 0.0)
    SetMapZoomDataLevel(3, 12.3, 0.9, 0.08, 0.0, 0.0)
    SetMapZoomDataLevel(4, 22.3, 0.9, 0.08, 0.0, 0.0)

	Citizen.Wait(0)
	HUD.Minimap = RebuildRadar(Config.Minimap.Round, 1, false)

	SetBlipAlpha(GetMainPlayerBlipId(), 0)
	SetBlipAlpha(GetNorthRadarBlip(), 0)
	DisplayRadar(false)

	nuiProxy({type = 'init', value = GetPlayerServerId(PlayerId())})
	while not HUD.Ready do
		Citizen.Wait(50)
	end

	local scaleformFunc = CallScaleformMovieMethod
	local timer = GetGameTimer
	local zoomFunc = SetRadarZoom
	local frameFunc = HideMinimapInteriorMapThisFrame

	local Hidden, RPMTime = false, timer()
    while true do
		Citizen.Wait(0)

		if HUD.Pause or HUD.Hide then
			Hidden = true
			CheckRadar(false)
			nuiProxy({type = 'hide'})
		else

			local lastBuild = HUD.LastBuild
			if not lastBuild then
				if HUD.VehicleClass then
					HUD.Minimap = RebuildRadar(Config.Minimap.RoundVehicle, 1, false)
				else
					HUD.Minimap = RebuildRadar(Config.Minimap.Round, 1, false)
				end
			end

			CheckRadar((HUD.VehicleClass ~= nil))
			scaleformFunc(HUD.Minimap, "HIDE_SATNAV")
			
				if not lastBuild then
						HUD.Minimap = RebuildRadar(Config.Minimap.RoundVehicle, 1, false)
				end

		end
	end
end)

CreateThread(function()
	while true do
		local radarEnabled = IsRadarEnabled()

		if not IsPedInAnyVehicle(PlayerPedId()) and radarEnabled then
			DisplayRadar(false)
		elseif IsPedInAnyVehicle(PlayerPedId()) and not radarEnabled then
			DisplayRadar(true)
		end

		Wait(1200)
	end
end)


CreateThread(function()

	local MM = GetMinimapAnchor(true)
	nuiProxy({
		type = 'update',
		anchor = MM
	})

	local pauseFunc = IsPauseMenuActive
	local getPid = PlayerId
	local getPed = PlayerPedId

	local compassFunc = GetGameplayCamRot
	local vehicleFunc = GetVehiclePedIsIn
	local classFunc = GetVehicleClass
	local coordsFunc = GetEntityCoords
	local headingFunc = GetEntityHeading


	local healthRecharge = SetPlayerHealthRechargeMultiplier

	while true do
		Citizen.Wait(200)
		if not HUD.Pause and pauseFunc() then
			HUD.Pause = true
		elseif HUD.Pause and not pauseFunc() then
			HUD.Pause = false
		end

		local pid = getPid()
		local ped = getPed()
		local coords = coordsFunc(ped, false)
		local heading = headingFunc(ped)

		healthRecharge(PlayerPedId(), 0.0)

		MM = GetMinimapAnchor(true)
		if Ped.Id ~= ped then
			if HUD.Blip and DoesBlipExist(HUD.Blip) then
				RemoveBlip(HUD.Blip)
			end

			HUD.Blip = AddBlipForEntity(ped)
			SetBlipSprite(HUD.Blip, (Ped.Vehicle and 545 or 1))

			SetBlipScale(HUD.Blip, 1.0)
			SetBlipCategory(HUD.Blip, 100)
			SetBlipPriority(HUD.Blip, 10)
			SetBlipColour(HUD.Blip, 55)
			SetBlipAsShortRange(HUD.Blip, true)

			SetBlipRotation(HUD.Blip, math.ceil(heading))
			ShowHeadingIndicatorOnBlip(HUD.Blip, true)
			Ped.Id = ped

			BeginTextCommandSetBlipName("STRING")
			AddTextComponentString("Twoja pozycja")
			EndTextCommandSetBlipName(HUD.Blip)
		end

		local direction = nil
		Ped.Rotation = compassFunc().z

		local vehicle = vehicleFunc(Ped.Id, false)
		if vehicle and vehicle ~= 0 then
			if not Ped.Vehicle then
				SetBlipSprite(HUD.Blip, 545)
				Ped.Vehicle = vehicle
			end

			HUD.VehicleClass = nil
			HUD.VehicleClass = classFunc(Ped.Vehicle)
		elseif Ped.Vehicle then
			SetBlipSprite(HUD.Blip, 1)
			HUD.VehicleClass = nil
			Ped.Vehicle = false
		end

		nuiProxy({
			type = 'update',
			anchor = MM,
			data = Ped
		})
	end
end)

AddEventHandler('HUD:Update', function(data)
	nuiProxy({
		type = 'update',
		data = data
	})
end)

RegisterNUICallback('ready', function(data, cb)
	HUD.Ready = true
	cb('ok')
end)
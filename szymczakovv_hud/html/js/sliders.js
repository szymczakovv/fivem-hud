const doc = document

const checkHealth = doc.getElementById('check-health')
const checkArmor = doc.getElementById('check-armor')
const checkStamina = doc.getElementById('check-stamina')
const checkOxygen = doc.getElementById('check-oxygen')
const checkMic = doc.getElementById('check-microphone')
const checkbelt = doc.getElementById('check-belt')
const checkCinematic = doc.getElementById('check-cinematic')

const healthCircle = doc.getElementById('health')
const armorCircle = doc.getElementById('armor')
const staminaCircle = doc.getElementById('stamina')
const oxygenCircle = doc.getElementById('oxygen')
const microphoneCircle = doc.getElementById('microphone')
const beltcircle = doc.getElementById('belt')
const cinemaId = doc.getElementById('cinematic')

const checkHunger = doc.getElementById('check-hunger')
const checkThirst = doc.getElementById('check-thirst')
const hungerCircle = doc.getElementById('hunger')
const thirstCircle = doc.getElementById('thirst')
const hungerSlider = doc.getElementById('slider-hunger')
const thirstSlider = doc.getElementById('slider-thirst')
const hungerOption = doc.getElementById('hunger-option')
const thirstOption = doc.getElementById('thirst-option')


let health, armor, stamina, oxygen, microphone, hunger, thirst, belt;
health = armor = stamina = oxygen = microphone = belt = hunger = thirst = true;

let cinematic = false;

window.addEventListener('load', () => {
    checkHealth.addEventListener('click', () => {
      health = checkHealth.checked
      if (health) {
        healthCircle.style.display = 'inline-block';
      } else {
        healthCircle.style.display = 'none';
      }
    })
  
    checkArmor.addEventListener('click', () => {
      armor = checkArmor.checked
      if (armor) {
        armorCircle.style.display = 'inline-block';
      } else {
        armorCircle.style.display = 'none'
      }
    })

    checkStamina.addEventListener('click', () => {
      stamina = checkStamina.checked
      if (stamina) {
        staminaCircle.style.display = 'inline-block';
      } else {
        staminaCircle.style.display = 'none'
      }
    })
  
    checkOxygen.addEventListener('click', () => {
      oxygen = checkOxygen.checked
      if (oxygen) {
        oxygenCircle.style.display = 'inline-block';
      } else {
        oxygenCircle.style.display = 'none'
      }
    })
  
    checkMic.addEventListener('click', () => {
      microphone = checkMic.checked
      if (microphone) {
        microphoneCircle.style.display = 'inline-block';
      } else {
        microphoneCircle.style.display = 'none'
      }
    })

    checkbelt.addEventListener('click', () => {
      belt = checkbelt.checked
      if (belt) {
        beltcircle.style.display = 'inline-block';
      } else {
        beltcircle.style.display = 'none'
      }
    })
  
    checkCinematic.addEventListener('click', () => {
      cinematic = checkCinematic.checked
      if (cinematic) {
        doc.getElementById('top').style.animation = 'slideDown 1.0s forwards'
        doc.getElementById('bottom').style.animation = 'slideUp 1.0s forwards'
        setTimeout(function() {
          cinemaId.style.animation = 'none'
        }, 1100)
        setCircles('hide');
      } else {
        doc.getElementById('top').style.animation = 'slideBackUp 1.0s forwards'
        doc.getElementById('bottom').style.animation = 'slideBackDown 1.0s forwards'
        setTimeout(function() {
          cinemaId.style.animation = 'none'
        }, 1100)
        setCircles('show');
      }
    })
  
    checkHunger.addEventListener('click', () => {
      hunger = checkHunger.checked
      if (hunger) {
        hungerCircle.style.display = 'inline-block';
      } else {
        hungerCircle.style.display = 'none'
      }
    })
    
    checkThirst.addEventListener('click', () => {
      thirst = checkThirst.checked
      if (thirst) {
        thirstCircle.style.display = 'inline-block';
      } else {
        thirstCircle.style.display = 'none'
      }
    })
  })

const setCircles = (boolean)=> {
    if (boolean == "show") {
        if (health) {
            healthCircle.style.display = 'inline-block';
        } else {
            healthCircle.style.display = 'none'
        }

        if (armor) {
            armorCircle.style.display = 'inline-block';
        } else {
            armorCircle.style.display = 'none'
        }

        if (stamina) {
          staminaCircle.style.display = 'inline-block';
        } else {
            staminaCircle.style.display = 'none'
        }

        if (oxygen) {
            oxygenCircle.style.display = 'inline-block';
        } else {
            oxygenCircle.style.display = 'none'
        }

        if (microphone) {
            microphoneCircle.style.display = 'inline-block';
        } else {
            microphoneCircle.style.display = 'none'
        }

        if (belt) {
          beltcircle.style.display = 'inline-block';
        } else {
          beltcircle.style.display = 'none'
        }
      
        if (hunger) {
            hungerCircle.style.display = 'inline-block';
        } else {
            hungerCircle.style.display = 'none'
        }

        if (thirst) {
            thirstCircle.style.display = 'inline-block';
        } else {
            thirstCircle.style.display = 'none'
        }
       
    } else if (boolean == "hide") {
        cinemaId.style.display = 'block';
        healthCircle.style.display = 'none'
        armorCircle.style.display = 'none'
        staminaCircle.style.display = 'none'
        oxygenCircle.style.display = 'none'
        microphoneCircle.style.display = 'none'
        beltcircle.style.display = 'none'
        hungerCircle.style.display = 'none'
        thirstCircle.style.display = 'none'
    }
}

const components = (what,boolean)=> {
  if (!checkOxygen.checked == false) {
    if (what == "oxygen") {
      if (boolean == "show") {
        if (oxygen) {
            oxygenCircle.style.display = 'inline-block';
        } else {
            oxygenCircle.style.display = 'none'
        }
      } else if (boolean == "hide") {
        oxygenCircle.style.display = 'none'
      }
    }
  }
  if (!checkbelt.checked == false) {
    if (what == "belt") {
      if (boolean == "show") {
        if (oxygen) {
          beltcircle.style.display = 'inline-block';
        } else {
          beltcircle.style.display = 'none'
        }
      } else if (boolean == "hide") {
        beltcircle.style.display = 'none'
      }
    }
  }

  if (!checkArmor.checked == false) {
    if (what == "armor") {
      if (boolean == "show") {
        if (oxygen) {
          armorCircle.style.display = 'inline-block';
        } else {
          armorCircle.style.display = 'none'
        }
      } else if (boolean == "hide") {
        armorCircle.style.display = 'none'
      }
    }
  }

  if (!checkStamina.checked == false) {
    if (what == "stamina") {
      if (boolean == "show") {
        if (oxygen) {
          staminaCircle.style.display = 'inline-block';
        } else {
          staminaCircle.style.display = 'none'
        }
      } else if (boolean == "hide") {
        staminaCircle.style.display = 'none'
      }
    }
  }
}


const frameworkStartUp = ()=> {
    hungerCircle.style.display = 'none';
    thirstCircle.style.display = 'none';
    hungerSlider.style.display = 'none';
    thirstSlider.style.display = 'none';
    hungerOption.style.display = 'none';
    thirstOption.style.display = 'none';
}
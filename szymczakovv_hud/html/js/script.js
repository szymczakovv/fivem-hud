const selection = doc.getElementById('selection')

window.addEventListener("message", function(event) {
  switch (event.data.action) {

    // // // // // 

    case "startUp":
      startDraggable();
      startColorpicker();
      startColors();
      startPositions();
      startSliders();
    break;

    // // // // // 

    case "startup-belt":
      progressCircle(0, ".belt");
    break;

    // // // // // 
    
    case "hud":
      progressCircle(event.data.health, ".health");
      progressCircle(event.data.armor, ".armor");
      progressCircle(event.data.stamina, ".stamina");
      progressCircle(event.data.oxygen, ".oxygen");
      progressCircle(event.data.hunger, ".hunger");
      progressCircle(event.data.thirst, ".thirst");
    break;
    
    // // // // // 

    case "show":
      startPhone();
    break;

    // // // // // 

    case "show_armor":
      components('armor', 'show')
    break;

    case "hide_armor":
      components('armor', 'hide')
    break;

    // // // // // 

    case "show_stamina":
      components('stamina', 'show')
    break;

    case "hide_stamina":
      components('stamina', 'hide')
    break;

    // // // // // 

    case "show_oxygen":
      components('oxygen', 'show')
    break;

    case "hide_oxygen":
      components('oxygen', 'hide')
    break;

    // // // // // 

    case "show_belt":
      components('belt', 'show')
    break;
    
    case "hide_belt":
      components('belt', 'hide')
    break;

    // // // // // 

    case "microphone":
      progressCircle(event.data.microphone, ".microphone");
    break;
    
    // // // // // 

    case "belt":
      progressCircle(event.data.belt, ".belt");
    break;

    // // // // // 

    case "isPaused":
      cinemaId.style.display = 'none';
      healthCircle.style.display = 'none';
      armorCircle.style.display = 'none';
      staminaCircle.style.display = 'none';
      oxygenCircle.style.display = 'none';
      microphoneCircle.style.display = 'none';
      beltcircle.style.display = 'none';
      hungerCircle.style.display = 'none';
      thirstCircle.style.display = 'none';
    break;

    // // // // // 

    case "notPaused":
      if (cinematic) {
        cinemaId.style.display = 'block';
      } else {
        setCircles('show');
        cinemaId.style.display = 'none';
      }
    break
    
    // // // // // 

  }
});

document.onkeyup = function(event) {
  if (event.key == 'Escape') {
      $("#phone").fadeOut();
      $.post('https://szymczakovv_hud/close');
      setTimeout(function() {
          phone.style.animation = 'none';
      }, 400)
  }
};

const startDraggable = ()=> {
  $('#health').draggable();
  $("#armor").draggable();
  $("#stamina").draggable();
  $("#oxygen").draggable();
  $("#microphone").draggable();
  $("#belt").draggable();
  $('#hunger').draggable();
  $('#thirst').draggable();
}

const startColors = ()=> {
  $('#health-circle').css('stroke', getStored('healthColor'));
  $('#armor-circle').css('stroke', getStored('armorColor'));
  $('#stamina-circle').css('stroke', getStored('staminaColor'));
  $('#oxygen-circle').css('stroke', getStored('oxygenColor'));
  $('#microphone-circle').css('stroke', getStored('microphoneColor'));
  $('#belt-circle').css('stroke', getStored('beltColor'));
  $('#hunger-circle').css('stroke', getStored('hungerColor'));
  $('#thirst-circle').css('stroke', getStored('thirstColor'));
}

const startPositions = ()=> {
  $("#health").animate({ top: getStored('dragHealthTop'), left: getStored('dragHealthLeft')});
  $("#armor").animate({ top: getStored('dragArmorTop'), left: getStored('dragArmorLeft')});
  $("#stamina").animate({ top: getStored('dragStaminaTop'), left: getStored('dragStaminaLeft')});
  $("#oxygen").animate({ top: getStored('dragOxygenTop'), left: getStored('dragOxygenLeft')});
  $("#microphone").animate({ top: getStored('dragMicrophoneTop'), left: getStored('dragMicrophoneLeft')});
  $("#belt").animate({ top: getStored('dragbeltTop'), left: getStored('dragbeltLeft')});
  $("#hunger").animate({ top: getStored('dragHungerTop'), left: getStored('dragHungerLeft')});
  $("#thirst").animate({ top: getStored('dragThirstTop'), left: getStored('dragThirstLeft')});
}

const startColorpicker = ()=> {
  colorPicker.value = rgb2hex($('#health-circle').css('stroke'));
  colorPicker.addEventListener("input", updateColorPicker, false);
  colorPicker.select();
}

const startSliders = ()=> {
  setSliders();
  setContainer('sliderHealth', 'check-health', 'health');
  setContainer('sliderArmor', 'check-armor', 'armor');
  setContainer('sliderStamina', 'check-stamina', 'stamina');
  setContainer('sliderOxygen', 'check-oxygen', 'oxygen');
  setContainer('sliderMicrophone', 'check-microphone', 'microphone');
  setContainer('sliderbelt', 'check-belt', 'belt');
  setContainer('sliderHunger', 'check-hunger', 'hunger');
  setContainer('sliderThirst', 'check-thirst', 'thirst');
}

const setSliders = ()=> {
  if (null != getId('sliderHealth')) {
    health = getId('sliderHealth')
  }
  if (null != getId('sliderArmor')) {
    armor = getId('sliderArmor')
  }
  if (null != getId('sliderStamina')) {
    stamina = getId('sliderStamina')
  }
  if (null != getId('sliderOxygen')) {
    oxygen = getId('sliderOxygen')
  }
  if (null != getId('sliderMicrophone')) {
    microphone = getId('sliderMicrophone')
  }
  if (null != getId('sliderbelt')) {
    belt = getId('sliderbelt')
  }
  if (null != getId('sliderHunger')) {
    hunger = getId('sliderHunger')
  }
  if (null != getId('sliderThirst')) {
    thirst = getId('sliderThirst')
  }
}

const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

window.addEventListener('load', ()=> {
  selection.addEventListener('change', ()=> {
    switch (selection.value) {
      case "health-option":
        colorPicker.value = rgb2hex($('#health-circle').css('stroke'))
      break;
  
      case "armor-option":
        colorPicker.value = rgb2hex($('#armor-circle').css('stroke'))
      break;

      case "stamina-option":
        colorPicker.value = rgb2hex($('#stamina-circle').css('stroke'))
      break;
  
      case "hunger-option":
        colorPicker.value = rgb2hex($('#hunger-circle').css('stroke'))
      break;
  
      case "thirst-option":
        colorPicker.value = rgb2hex($('#thirst-circle').css('stroke'))
      break;

  
      case "oxygen-option":
        colorPicker.value = rgb2hex($('#oxygen-circle').css('stroke'))
      break;
  
      case "microphone-option":
        colorPicker.value = rgb2hex($('#microphone-circle').css('stroke'))
      break;

      case "belt-option":
        colorPicker.value = rgb2hex($('#belt-circle').css('stroke'))
      break;
    };
  $('#selection').blur();
  });
});

let updateColorPicker = (event)=> {
  let color = event.target.value;
  switch (selection.value) {
    case "health-option":
      $('#health-circle').css('stroke', color);
      saveId('healthColor', color);
    break;

    case "armor-option":
      $('#armor-circle').css('stroke', color);
      saveId('armorColor', color);
    break;

    case "stamina-option":
      $('#stamina-circle').css('stroke', color);
      saveId('staminaColor', color);
    brea

    case "oxygen-option":
      $('#oxygen-circle').css('stroke', color);
      saveId('oxygenColor', color);
    break;

    case "microphone-option":
      $('#microphone-circle').css('stroke', color);
      saveId('microphoneColor', color);
    break;

    case "belt-option":
      $('#belt-circle').css('stroke', color);
      saveId('beltColor', color);
    break;

    case "hunger-option":
      $('#hunger-circle').css('stroke', color);
      saveId('hungerColor', color);
    break;

    case "thirst-option":
      $('#thirst-circle').css('stroke', color);
      saveId('thirstColor', color);
    break;
  };
}

let progressCircle = (percent, element) => {
  const circle = document.querySelector(element);
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;
  const html = $(element).parent().parent().find("span");

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;

  const offset = circumference - ((-percent * 100) / 100 / 100) * circumference;
  circle.style.strokeDashoffset = -offset;

  html.text(Math.round(percent));
}

function setContainer(slider, check, container) {
  if (getId(slider) == null) {
    doc.getElementById(check).checked = true;
    return
  } else {
    doc.getElementById(check).checked = getId(slider)
    if (getId(slider)) {
      doc.getElementById(container).style.display = 'inline-block';
    } else {
      doc.getElementById(container).style.display = 'none';
    }
  }
}
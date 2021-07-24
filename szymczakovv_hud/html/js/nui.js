const phone = doc.getElementById('phone')
const alertNoti = doc.querySelector('.alert')
const soundNoti = doc.getElementById('audio')
const colorPicker = doc.querySelector('.colorpicker')

let dragHealthTop, dragHealthLeft, dragArmorTop, dragArmorLeft, dragOxygenTop, dragOxygenLeft, dragMicrophoneTop, dragMicrophoneLeft, dragbeltTop, dragbeltLeft, dragIdTop, dragIdLeft, dragHungerTop, dragHungerLeft, dragThirstTop, dragThirstLeft, dragStaminaTop, dragStaminaLeft;
dragHealthTop = dragHealthLeft = dragArmorTop = dragArmorLeft = dragOxygenTop = dragOxygenLeft = dragMicrophoneTop = dragMicrophoneLeft = dragbeltTop = dragbeltLeft = dragIdTop = dragIdLeft = dragHungerTop = dragHungerLeft = dragThirstTop = dragThirstLeft = dragStaminaTop = dragStaminaLeft = 0;

document.querySelector('.invert-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.querySelector('.image-exit').addEventListener('click', () => {
    $("#phone").fadeOut();
    $.post('https://szymczakovv_hud/close');
    setTimeout(function() {
        phone.style.animation = 'none'
    }, 400)
});

document.querySelector('.accept-button').addEventListener('click', () => {
    soundNoti.play();
    $(".reset-buttons").fadeOut();
    $(".accept-button").fadeOut();
    alertNoti.textContent = "Zapisywanie ustawień...."
    alertNoti.style.display = "flex";
    alertNoti.style.animation = "fadeIn 1.5s forwards";
    setTimeout(function() {
        alertNoti.textContent = "Zapisano ustawienia!"
        alertNoti.style.animation = 'none';
    }, 1600)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1.5s forwards";
    }, 4000)
    setTimeout(function() {
        alertNoti.style.display = 'none';
        alertNoti.style.animation = 'none';
        $(".accept-button").fadeIn();
        $(".reset-buttons").fadeIn();
        saveData();
    }, 5600)
});

document.getElementById('reset-color').addEventListener('click', () => {
    soundNoti.play();
    $(".reset-buttons").fadeOut();
    $(".accept-button").fadeOut();
    alertNoti.style.display = "flex";
    alertNoti.style.animation = "fadeIn 1s forwards";
    alertNoti.textContent = "Resetowanie koloru..."
    setTimeout(function() {
        alertNoti.style.animation = 'none';
        alertNoti.textContent = "Zapisano ustawienia!"
    }, 1100)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1s forwards";
    }, 2500)
    setTimeout(function() {
        alertNoti.style.display = 'none';
        alertNoti.style.animation = 'none';
        resetColors();
    }, 3600)
});

document.getElementById('reset-position').addEventListener('click', () => {
    soundNoti.play();
    $(".reset-buttons").fadeOut();
    $(".accept-button").fadeOut();
    alertNoti.style.display = "flex";
    alertNoti.style.animation = "fadeIn 1s forwards";
    alertNoti.textContent = "Resetowanie pozycji..."
    setTimeout(function() {
        alertNoti.style.animation = 'none';
        alertNoti.textContent = "Zapisano ustawienia!"
    }, 1100)
    setTimeout(function() {
        alertNoti.style.animation = "fadeOut 1s forwards";
    }, 2500)
    setTimeout(function() {
        alertNoti.style.display = 'none';
        alertNoti.style.animation = 'none';
        $(".accept-button").fadeIn();
        $(".reset-buttons").fadeIn();
        resetDrag();
    }, 3600)
});

// Record the position
$("#health").on("dragstop", function(event, ui) {
    dragHealthTop = ui.position.top;
    dragHealthLeft = ui.position.left;
});

$("#armor").on("dragstop", function(event, ui) {
    dragArmorTop = ui.position.top;
    dragArmorLeft = ui.position.left;
});

$("#stamina").on("dragstop", function(event, ui) {
    dragStaminaTop = ui.position.top;
    dragStaminaLeft = ui.position.left;
});

$("#oxygen").on("dragstop", function(event, ui) {
    dragOxygenTop = ui.position.top;
    dragOxygenLeft = ui.position.left;
});

$("#microphone").on("dragstop", function(event, ui) {
    dragMicrophoneTop = ui.position.top;
    dragMicrophoneLeft = ui.position.left;
});

$("#belt").on("dragstop", function(event, ui) {
    dragbeltTop = ui.position.top;
    dragbeltLeft = ui.position.left;
});


$("#hunger").on("dragstop", function(event, ui) {
    dragHungerTop = ui.position.top;
    dragHungerLeft = ui.position.left;
});

$("#thirst").on("dragstop", function(event, ui) {
    dragThirstTop = ui.position.top;
    dragThirstLeft = ui.position.left;
});


const startPhone = ()=> {
    phone.style.display = 'flex';
    phone.style.animation = "slide 1.5s forwards";
}

const saveData = ()=> {
    saveId('dragHealthTop', dragHealthTop);
    saveId('dragHealthLeft', dragHealthLeft);
    saveId('dragArmorTop', dragArmorTop);
    saveId('dragArmorLeft', dragArmorLeft);
    saveId('dragStaminaTop', dragStaminaTop);
    saveId('dragStaminaLeft', dragStaminaLeft);
    saveId('dragOxygenTop', dragOxygenTop);
    saveId('dragOxygenLeft', dragOxygenLeft);
    saveId('dragIdTop', dragIdTop);
    saveId('dragIdLeft', dragIdLeft);
    saveId('dragMicrophoneTop', dragMicrophoneTop);
    saveId('dragMicrophoneLeft', dragMicrophoneLeft);
    saveId('dragbeltTop', dragbeltTop);
    saveId('dragbeltLeft', dragbeltLeft);
    saveId('dragHungerTop', dragHungerTop);
    saveId('dragHungerLeft', dragHungerLeft);
    saveId('dragThirstTop', dragThirstTop);
    saveId('dragThirstLeft', dragThirstLeft);
    saveId('sliderHealth', health);
    saveId('sliderArmor', armor);
    saveId('sliderOxygen', oxygen);
    saveId('sliderMicrophone', microphone);
    saveId('sliderbelt', belt);
    saveId('sliderHunger', hunger);
    saveId('sliderThirst', thirst);
    saveId('sliderStamina', stamina);
}

const resetDrag = ()=> {
    $("#health").animate({ top: "0px", left: "0px" });
    saveId('dragHealthTop', '0px');
    saveId('dragHealthLeft', '0px');
    $("#armor").animate({ top: "0px", left: "0px" });
    saveId('dragArmorTop', '0px');
    saveId('dragArmorLeft', '0px');
    $("#stamina").animate({ top: "0px", left: "0px" });
    saveId('dragStaminaTop', '0px');
    saveId('dragStaminaLeft', '0px');
    $("#oxygen").animate({ top: "0px", left: "0px" });
    saveId('dragOxygenTop', '0px');
    saveId('dragOxygenLeft', '0px');
    $("#microphone").animate({ top: "0px", left: "0px" });
    saveId('dragMicrophoneTop', '0px');
    saveId('dragMicrophoneLeft', '0px');
    $("#belt").animate({ top: "0px", left: "0px" });
    saveId('dragbeltTop', '0px');
    saveId('dragbeltLeft', '0px');
    $("#hunger").animate({top: "0px", left: "0px"});
    saveId('dragHungerTop', '0px');
    saveId('dragHungerLeft', '0px');
    $("#thirst").animate({top: "0px", left: "0px"});
    saveId('dragThirstTop', '0px');
    saveId('dragThirstLeft', '0px');
}

const resetColors = ()=> {
    $(".accept-button").fadeIn();
    $(".reset-buttons").fadeIn();
    $('#health-circle').css('stroke', '');
    saveId('healthColor', '');
    $('#armor-circle').css('stroke', '');
    saveId('armorColor', '');
    $('#stamina-circle').css('stroke', '');
    saveId('staminaColor', '');
    $('#oxygen-circle').css('stroke', '');
    saveId('oxygenColor', '');
    $('#microphone-circle').css('stroke', '');
    saveId('microphoneColor', '');
    $('#belt-circle').css('stroke', '');
    saveId('beltColor', '');
    $('#hunger-circle').css('stroke', '');
    saveId('hungerColor', '');
    $('#thirst-circle').css('stroke', '');
    saveId('thirstColor', '');
    colorPicker.value = rgb2hex($('#health-circle').css('stroke'))
}

function saveId(item, check) {
    localStorage.setItem(item, check);
}

function getId(item) {
    let storage = JSON.parse(localStorage.getItem(item));
    return storage
}

function getStored(item) {
    let storage = localStorage.getItem(item)
    return storage
}
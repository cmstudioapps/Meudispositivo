// Função para obter informações básicas do dispositivo
function getDeviceInfo() {
  const userAgent = navigator.userAgent;

  // Nome do dispositivo (aproximação a partir do User-Agent)
  const deviceMatch = userAgent.match(/([^)]+)/);
  const deviceName = deviceMatch ? deviceMatch[1] : "Não identificado";

  // Tamanho da tela
  const screenSize = `${window.screen.width} x ${window.screen.height}`;// Função para obter informações básicas do dispositivo
function getDeviceInfo() {
  const userAgent = navigator.userAgent;

  // Nome do dispositivo (aproximação a partir do User-Agent)
  const deviceMatch = userAgent.match(/([^)]+)/);
  const deviceName = deviceMatch ? deviceMatch[1] : "Não identificado";

  // Tamanho da tela
  const screenSize = `${window.screen.width} x ${window.screen.height}`;

  // Atualizar na página
  document.getElementById("device-name").innerText = `Nome do dispositivo: ${deviceName}`;
  document.getElementById("screen-size").innerText = `Tamanho da tela: ${screenSize}`;
}

// Função para obter informações da bateria
async function getBatteryInfo() {
  if ('getBattery' in navigator) {
    const battery = await navigator.getBattery();
    const batteryStatusElement = document.getElementById("battery-status");
    const batteryTimeElement = document.getElementById("battery-time");

    // Exibir porcentagem e status
    const updateBatteryInfo = () => {
      const percent = (battery.level * 100).toFixed(0);
      const charging = battery.charging ? "Carregando" : "Descarregando";
      batteryStatusElement.innerText = `Bateria: ${percent}% (${charging})`;
    };

    // Estimar tempo de descarga (ou carregamento)
    const calculateDischargeTime = () => {
      if (!battery.charging) {
        const dischargeRate = battery.dischargingTime > 0 ? battery.dischargingTime / 60 : null; // Em minutos
        if (dischargeRate) {
          batteryTimeElement.innerText = `Tempo estimado de descarga: ${dischargeRate.toFixed(1)} horas`;
        } else {
          batteryTimeElement.innerText = "Tempo estimado de descarga: Não disponível";
        }
      } else {
        batteryTimeElement.innerText = "Tempo estimado de descarga: Carregando";
      }
    };

    // Atualizar informações inicialmente e nos eventos
    updateBatteryInfo();
    calculateDischargeTime();

    battery.addEventListener("levelchange", updateBatteryInfo);
    battery.addEventListener("dischargingtimechange", calculateDischargeTime);
  } else {
    document.getElementById("battery-status").innerText = "Bateria: Não suportado";
    document.getElementById("battery-time").innerText = "Tempo estimado de descarga: Não suportado";
  }
}

// Função para obter localização do dispositivo
function getLocation() {
  const locationElement = document.getElementById("location");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        locationElement.innerText = `Localização: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      },
      (error) => {
        locationElement.innerText = "Localização: Não foi possível obter";
        console.error("Erro ao obter localização:", error);
      }
    );
  } else {
    locationElement.innerText = "Localização: Não suportada";
  }
}

// Chamando as funções
getDeviceInfo();
getBatteryInfo();
getLocation();

  // Atualizar na página
  document.getElementById("device-name").innerText = `Nome do dispositivo: ${deviceName}`;
  document.getElementById("screen-size").innerText = `Tamanho da tela: ${screenSize}`;
}

// Função para obter informações da bateria
async function getBatteryInfo() {
  if ('getBattery' in navigator) {
    const battery = await navigator.getBattery();
    const batteryStatusElement = document.getElementById("battery-status");
    const batteryTimeElement = document.getElementById("battery-time");

    // Exibir porcentagem e status
    const updateBatteryInfo = () => {
      const percent = (battery.level * 100).toFixed(0);
      const charging = battery.charging ? "Carregando" : "Descarregando";
      batteryStatusElement.innerText = `Bateria: ${percent}% (${charging})`;
    };

    // Estimar tempo de descarga (ou carregamento)
    const calculateDischargeTime = () => {
      if (!battery.charging) {
        const dischargeRate = battery.dischargingTime > 0 ? battery.dischargingTime / 60 : null; // Em minutos
        if (dischargeRate) {
          batteryTimeElement.innerText = `Tempo estimado de descarga: ${dischargeRate.toFixed(1)} horas`;
        } else {
          batteryTimeElement.innerText = "Tempo estimado de descarga: Não disponível";
        }
      } else {
        batteryTimeElement.innerText = "Tempo estimado de descarga: Carregando";
      }
    };

    // Atualizar informações inicialmente e nos eventos
    updateBatteryInfo();
    calculateDischargeTime();

    battery.addEventListener("levelchange", updateBatteryInfo);
    battery.addEventListener("dischargingtimechange", calculateDischargeTime);
  } else {
    document.getElementById("battery-status").innerText = "Bateria: Não suportado";
    document.getElementById("battery-time").innerText = "Tempo estimado de descarga: Não suportado";
  }
}

// Função para obter localização do dispositivo
function getLocation() {
  const locationElement = document.getElementById("location");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        locationElement.innerText = `Localização: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      },
      (error) => {
        locationElement.innerText = "Localização: Não foi possível obter";
        console.error("Erro ao obter localização:", error);
      }
    );
  } else {
    locationElement.innerText = "Localização: Não suportada";
  }
}

// Chamando as funções
getDeviceInfo();
getBatteryInfo();
getLocation();
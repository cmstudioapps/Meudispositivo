// Função para detectar o sistema operacional
// Função para detectar o sistema operacional
function getOperatingSystem() {
  const userAgent = navigator.userAgent;

  if (userAgent.indexOf('Android') !== -1) return 'Android'; // Verificação explícita para Android
  if (userAgent.indexOf('Win') !== -1) return 'Windows';
  if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
  if (userAgent.indexOf('Linux') !== -1) return 'Linux'; // Deixe o Linux por último, já que Android é baseado nele
  if (userAgent.indexOf('like Mac') !== -1) return 'iOS';

  return 'Desconhecido';
}

// Função para obter informações básicas do dispositivo
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

  // Atualizar o sistema operacional
  document.getElementById("os-name").innerText = `Sistema Operacional: ${getOperatingSystem()}`;
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

        // Função para carregar o mapa no iframe com base na localização
        function loadLocation() {
          const iframe = document.getElementById('locationFrame');
          const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`;
          iframe.src = mapUrl;
        }

        // Chama a função para carregar a localização no iframe
        loadLocation();
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

// Função para obter o IP do usuário
async function getUserIP() {
  const ipElement = document.getElementById("user-ip");

  try {
    // Obtendo o IP público através da API ipify
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();

    // Exibindo o IP na página
    ipElement.innerText = `IP do usuário: ${data.ip}`;
  } catch (error) {
    ipElement.innerText = "IP: Não foi possível obter";
    console.error("Erro ao obter o IP:", error);
  }
}
// Função para obter o tipo de conexão (Wi-Fi ou dados móveis)
function getConnectionType() {
  const connectionElement = document.getElementById("connection-type");

  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const connectionType = connection.effectiveType;

    if (connectionType === 'wifi') {
      connectionElement.innerText = "Tipo de conexão: Wi-Fi";
    } else if (connectionType === 'cellular') {
      connectionElement.innerText = "Tipo de conexão: Dados móveis";
    } else {
      connectionElement.innerText = "Tipo de conexão: " + connectionType;
    }

    // Listener para mudanças na conexão
    connection.addEventListener('change', () => {
      const newConnectionType = connection.effectiveType;
      if (newConnectionType === 'wifi') {
        connectionElement.innerText = "Tipo de conexão: Wi-Fi";
      } else if (newConnectionType === 'cellular') {
        connectionElement.innerText = "Tipo de conexão: Dados móveis";
      } else {
        connectionElement.innerText = "Tipo de conexão: " + newConnectionType;
      }
    });
  } else {
    connectionElement.innerText = "Tipo de conexão: Não suportado";
  }
}

function ativarTelaCheia() {
  let elemento = document.documentElement; // Ou outro elemento específico, como body
  
  if (elemento.requestFullscreen) {
    elemento.requestFullscreen();
  } else if (elemento.mozRequestFullScreen) { // Firefox
    elemento.mozRequestFullScreen();
  } else if (elemento.webkitRequestFullscreen) { // Chrome, Safari
    elemento.webkitRequestFullscreen();
  } else if (elemento.msRequestFullscreen) { // IE/Edge
    elemento.msRequestFullscreen();
  }
}

// Chamando as funções
ativarTelaCheia()
getDeviceInfo();
getBatteryInfo();
getLocation();
getConnectionType()
getUserIP();
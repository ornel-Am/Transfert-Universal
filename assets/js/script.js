// Détection automatique
const parser = new UAParser();
const result = parser.getResult();

const platform = {
    name: 'unknown',
    icon: 'fa-desktop'
};

if (result.os.name === 'Android') {
    platform.name = 'android';
    platform.label = 'Android';
    platform.file = 'transfert.apk';
} else if (result.os.name === 'Windows') {
    platform.name = 'windows';
    platform.label = 'Windows';
    platform.file = 'transfert.exe';
} else if (result.os.name === 'Linux') {
    platform.name = 'linux';
    platform.label = 'Linux';
    platform.file = 'Transfert.AppImage';
} else if (result.os.name === 'macOS') {
    platform.name = 'macos';
    platform.label = 'macOS';
    platform.file = 'transfert.dmg';
} else {
    platform.name = 'web';
    platform.label = 'Web';
}

document.addEventListener('DOMContentLoaded', function() {
    const detectMessage = document.getElementById('detectMessage');
    const btnAuto = document.getElementById('btnAutoDownload');
    
    fetch('https://api.github.com/repos/ornel-Am/Transfert/releases/latest')
        .then(response => response.json())
        .then(data => {
            const version = data.tag_name || 'v1.0.0';
            document.getElementById('version').textContent = version;
            document.getElementById('buildDate').textContent = version;
            updateDownloadLinks(version);
        })
        .catch(() => {
            document.getElementById('version').textContent = 'v1.0.0';
        });
    
    if (platform.name !== 'web' && platform.name !== 'unknown') {
        const platformNames = {
            'android': 'Android',
            'windows': 'Windows',
            'linux': 'Linux',
            'macos': 'macOS'
        };
        detectMessage.textContent = `Vous êtes sur ${platformNames[platform.name]}. Cliquez ci-dessous pour télécharger et installer immédiatement.`;
        btnAuto.innerHTML = `<i class="fas fa-download"></i> Télécharger pour ${platformNames[platform.name]}`;
        btnAuto.onclick = function() {
            downloadAndInstall();
        };
    } else {
        detectMessage.textContent = 'Choisissez votre plateforme ci-dessous.';
        btnAuto.style.display = 'none';
    }
    
    updateVersionBadges();
    setupButtons();
});

function updateDownloadLinks(version) {
    const baseUrl = `https://github.com/ornel-Am/Transfert/releases/download/${version}`;
    document.querySelectorAll('.btn-download').forEach(btn => {
        const file = btn.dataset.file;
        btn.href = `${baseUrl}/${file}`;
        btn.target = '_blank';
    });
}

function downloadAndInstall() {
    const version = document.getElementById('version').textContent;
    const baseUrl = `https://github.com/ornel-Am/Transfert/releases/download/${version}`;
    
    switch(platform.name) {
        case 'android':
            window.location.href = `${baseUrl}/transfert.apk`;
            showInstallInstructions('android');
            break;
        case 'windows':
            window.location.href = `${baseUrl}/transfert.exe`;
            showInstallInstructions('windows');
            break;
        case 'linux':
            window.location.href = `${baseUrl}/Transfert.AppImage`;
            showInstallInstructions('linux');
            break;
        case 'macos':
            window.location.href = `${baseUrl}/transfert.dmg`;
            showInstallInstructions('macos');
            break;
        default:
            window.location.href = '/webapp/';
    }
}

function showInstallInstructions(platform) {
    const instructions = {
        'android': `
            <h3>📱 Installation Android</h3>
            <ol>
                <li>Le fichier APK va se télécharger</li>
                <li>Ouvrez le fichier APK</li>
                <li>Autorisez l'installation si nécessaire</li>
                <li>Installez et lancez</li>
            </ol>
        `,
        'windows': `
            <h3>🪟 Installation Windows</h3>
            <ol>
                <li>Le fichier EXE va se télécharger</li>
                <li>Double-cliquez sur le fichier</li>
                <li>Si Windows Defender bloque, cliquez sur "Plus d'infos" puis "Exécuter quand même"</li>
            </ol>
        `,
        'linux': `
            <h3>🐧 Installation Linux</h3>
            <ol>
                <li>Le fichier AppImage va se télécharger</li>
                <li>Rendez-le exécutable : <code>chmod +x Transfert.AppImage</code></li>
                <li>Lancez : <code>./Transfert.AppImage</code></li>
            </ol>
        `,
        'macos': `
            <h3>🍏 Installation macOS</h3>
            <ol>
                <li>Le fichier DMG va se télécharger</li>
                <li>Ouvrez le DMG</li>
                <li>Glissez l'application dans le dossier Applications</li>
            </ol>
        `
    };
    
    showPopup(instructions[platform] || '<h3>📥 Téléchargement en cours...</h3>');
}

function showPopup(htmlContent) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    popup.innerHTML = `
        <div style="background: #1a1a2e; border: 1px solid rgba(66,165,245,0.2); border-radius: 16px; padding: 30px; max-width: 500px; width: 90%; color: #e0e0e0; max-height: 80vh; overflow-y: auto;">
            <div style="text-align: right;">
                <button onclick="this.closest('div[style]').parentElement.remove()" style="background: none; border: none; color: #888; font-size: 24px; cursor: pointer;">✕</button>
            </div>
            ${htmlContent}
        </div>
    `;
    document.body.appendChild(popup);
}

function updateVersionBadges() {
    const version = document.getElementById('version').textContent;
    document.querySelectorAll('.platform-card').forEach(card => {
        const btn = card.querySelector('.btn-download');
        if (btn) {
            const file = btn.dataset.file;
            btn.href = `https://github.com/ornel-Am/Transfert/releases/download/${version}/${file}`;
        }
    });
}

function setupButtons() {
    document.querySelectorAll('.btn-install, .btn-run').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.dataset.platform;
            showInstallInstructions(platform);
        });
    });
    
    document.getElementById('btnChangelog').addEventListener('click', function(e) {
        e.preventDefault();
        showPopup(`
            <h3>📋 Changelog</h3>
            <ul>
                <li><strong>v1.0.0</strong> - Version initiale</li>
                <li>Support Android, Windows, Linux, macOS</li>
                <li>Interface Kivy</li>
            </ul>
        `);
    });
    
    document.getElementById('btnSupport').addEventListener('click', function(e) {
        e.preventDefault();
        showPopup(`
            <h3>💬 Support</h3>
            <p>Pour toute question ou problème :</p>
            <ul>
                <li>📧 Email : support@transfert.com</li>
                <li>🐛 Bug : <a href="https://github.com/ornel-Am/Transfert/issues" target="_blank">GitHub Issues</a></li>
            </ul>
        `);
    });
}

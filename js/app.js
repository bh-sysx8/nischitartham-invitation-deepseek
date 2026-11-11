document.addEventListener('DOMContentLoaded', () => {
    // 1. Language Initialization
    const currentLang = localStorage.getItem('invitationLang') || 'te';
    renderLanguage(currentLang);

    // 2. Language Switcher Toggle
    const langBtn = document.getElementById('lang-btn');
    langBtn.addEventListener('click', () => {
        const newLang = localStorage.getItem('invitationLang') === 'en' ? 'te' : 'en';
        localStorage.setItem('invitationLang', newLang);
        renderLanguage(newLang);
    });

    // 3. Render logic
    function renderLanguage(lang) {
        const content = translations[lang];
        const container = document.getElementById('content-container');
        
        // Update document title and lang attribute
        document.documentElement.lang = lang;
        document.title = lang === 'te' ? "నిశ్చితార్థపు ఆహ్వానము | Lakshmi Sowmya & Praneeth Chandra" : "Engagement Invitation | Lakshmi Sowmya & Praneeth Chandra";

        // Update button appearance
        const langBtn = document.getElementById('lang-btn');
        langBtn.innerHTML = lang === 'te' ? 'తెలుగు | <span style="opacity:0.5">EN</span>' : '<span style="opacity:0.5">తెలుగు</span> | EN';

        // Apply HTML content and appropriate font classes
        container.className = content.fontClass;
        container.innerHTML = content.html;

        // Update button labels
        document.getElementById('label-calendar').textContent = content.buttons.calendar;
        document.getElementById('label-maps').textContent = content.buttons.maps;
        document.getElementById('label-copy').textContent = content.buttons.copy;
        
        // Ensure action buttons inherit correct fonts
        const actionBtns = document.querySelector('.action-buttons');
        actionBtns.style.fontFamily = lang === 'te' ? "var(--font-te-sans)" : "var(--font-en-sans)";
    }

    // 4. Action Buttons
    document.getElementById('btn-calendar').addEventListener('click', () => {
        const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE` +
            `&text=${encodeURIComponent(config.event.calendarTitle)}` +
            `&dates=${config.event.calendarDates}` +
            `&details=${encodeURIComponent(config.event.calendarDetails)}` +
            `&location=${encodeURIComponent(config.event.calendarLocation)}`;
        window.open(calUrl, '_blank');
    });

    document.getElementById('btn-maps').addEventListener('click', () => {
        window.open(config.event.mapsUrl, '_blank');
    });

    document.getElementById('btn-copy').addEventListener('click', async () => {
        const lang = localStorage.getItem('invitationLang') || 'te';
        try {
            await navigator.clipboard.writeText(window.location.href);
            showToast(translations[lang].buttons.copied);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback strategy if clipboard API fails
            const textArea = document.createElement("textarea");
            textArea.value = window.location.href;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            showToast(translations[lang].buttons.copied);
        }
    });

    // 5. Toast Notification
    function showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
});

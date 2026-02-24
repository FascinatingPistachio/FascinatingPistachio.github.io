document.addEventListener("DOMContentLoaded", () => {
    initSharedLayout();

    // Conditional Logic based on elements present on the page
    if (document.getElementById('loom-container')) {
        initImageLoom();
    }

    if (document.getElementById('gallery-scroll-container')) {
        initGallery();
    }

    initAvatarCycle();
});

/* =========================================
   1. Shared Layout (Nav & Footer)
   ========================================= */
function initSharedLayout() {
    // --- 1. Inject View Transition Meta Tag ---
    // This enables the seamless morphing between pages in supported browsers (Chrome/Edge/Safari 18+)
    if (!document.querySelector('meta[name="view-transition"]')) {
        const meta = document.createElement('meta');
        meta.name = 'view-transition';
        meta.content = 'same-origin';
        document.head.appendChild(meta);
    }

    // --- 2. Inject Navbar (FIXED AT TOP) ---
    // We use 'afterbegin' on body to ensure it's always at the top (Y=0)
    const navHTML = `
      <nav id="main-nav" class="fixed top-0 left-0 w-full flex justify-center bg-[#fff6bd]/95 border-b-2 border-black p-3 flex-wrap z-50 shadow-[0_3px_0_#000] transition-colors duration-300">
        <div class="flex items-center gap-2">
            <a href="index.html" class="nav-link relative" data-page="index.html">Home</a>
            <a href="index.html#projects" class="nav-link relative">Projects</a>
            <a href="index.html#skills" class="nav-link relative">Skills</a>
            <a href="index.html#experience" class="nav-link relative">Experience</a>
            <a href="index.html#contact" class="nav-link relative">Contact</a>
            <a href="gallery.html" class="nav-link relative" data-page="gallery.html">Gallery</a>
        </div>
      </nav>
    `;

    document.body.insertAdjacentHTML("afterbegin", navHTML);

    // Add padding to body so content doesn't hide behind fixed nav
    document.body.classList.add('pt-20');

    // --- 3. Inject Footer ---
    const currentYear = new Date().getFullYear();
    const footerHTML = `
      <footer class="text-center p-6 bg-[#ffd1f2] text-[#3e2258] border-t-2 border-black text-sm mt-auto">
        <p>© 2025${currentYear > 2025 ? "–" + currentYear : ""} Aaron — Built with ❤️ and deployed on
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" class="text-[#555] underline">Vercel</a></p>
      </footer>
    `;
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    // --- 4. Highlight Active Link & Setup Animation ---
    const path = location.pathname.split("/").pop();
    const currentPage = path === "" ? "index.html" : path;

    document.querySelectorAll(".nav-link").forEach(link => {
      const targetPage = link.getAttribute("data-page");

      // Base styles for all links
      link.classList.add("font-bold", "rounded-none", "px-4", "py-2", "text-sm", "transition-colors", "border-2", "border-transparent");

      if (targetPage && targetPage === currentPage) {
        link.classList.add("active-link", "font-bold", "text-[#201046]", "border-black", "bg-[#a5ebff]");
        // Add the background "pill" for the active state
        // We use view-transition-name in CSS to animate this specific element moving between pages
        link.innerHTML += `<span class="absolute inset-0 bg-[#a5ebff] -z-10" style="view-transition-name: active-nav-pill;"></span>`;
      } else {
        link.classList.add("text-[#4f3f70]", "hover:text-black", "hover:bg-[#fff]", "hover:border-black");
      }
    });
}

/* =========================================
   2. Avatar Cycle (Hero)
   ========================================= */
function initAvatarCycle() {
    const avatar = document.getElementById('hero-avatar');
    if (!avatar) return;

    const list = avatar.dataset.avatarList;
    if (!list) return;

    const avatars = list.split('|').filter(Boolean);
    if (avatars.length <= 1) return;

    let index = 0;
    setInterval(() => {
        index = (index + 1) % avatars.length;
        avatar.classList.add('fade-out');
        setTimeout(() => {
            avatar.src = avatars[index];
            avatar.classList.remove('fade-out');
        }, 300);
    }, 4000);
}

/* =========================================
   3. Home Page Logic (Image Loom)
   ========================================= */
function initImageLoom() {
    const reel = document.getElementById('image-loom-reel');
    const viewer = document.getElementById('image-loom-viewer');
    const leftText = document.getElementById('loom-text-left');
    const rightText = document.getElementById('loom-text-right');
    const container = document.getElementById('loom-container');

    let isPaused = false;

    if (reel && viewer && leftText && rightText && container) {
      let currentIndex = 0;
      const totalImages = 3;
      const slideData = [
        { left: "Based on my looks and personality,", right: "with a train!" },
        { left: "A custom minifig I designed,", right: "using the 'Stud.io' 3D software." },
        { left: "This Mii shows my love for Nintendo!", right: "We've got a WiiU, 2 Switches, N64, & GameCube!" }
      ];

      // Pause on hover
      container.addEventListener('mouseenter', () => isPaused = true);
      container.addEventListener('mouseleave', () => isPaused = false);

      function changeSlide() {
        if (isPaused) return;

        // Hide text
        leftText.classList.remove('visible');
        rightText.classList.remove('visible');

        setTimeout(() => {
          currentIndex = (currentIndex + 1) % totalImages;
          leftText.innerHTML = slideData[currentIndex].left;
          rightText.innerHTML = slideData[currentIndex].right;

          viewer.classList.add('shake');
          reel.style.transform = `translateY(-${currentIndex * (100 / totalImages)}%)`;

          setTimeout(() => {
              leftText.classList.add('visible');
              rightText.classList.add('visible');
          }, 300);

          setTimeout(() => {
            viewer.classList.remove('shake');
          }, 400);
        }, 500);
      }

      // Initial Load
      leftText.innerHTML = slideData[0].left;
      rightText.innerHTML = slideData[0].right;

      setTimeout(() => {
          leftText.classList.add('visible');
          rightText.classList.add('visible');
      }, 200);

      setInterval(changeSlide, 5000);
    }
}

/* =========================================
   4. Gallery Logic (Audio & Scroll)
   ========================================= */
function initGallery() {
    const galleryItems = [
        {
            title: "Henry Oakley",
            caption: "GNR Class C1 \"Henry Oakley\"<br>National Railway Museum",
            src: "https://i.ibb.co/JF5PTXW7/AP1-Gcz-MOO4-MOzy3-V-L7c-Xe-Jsxc-XDgqe9-JDHs-TJK-Qy-Ln-PKVj-Qj-NFBGNHV6-E6i-W-Yw2-H6-JS5s-Lg-exxah-R.jpg",
            audioSrc: "media/HenryOakley.mp3",
            featured: false
        },
        {
            title: "Mallard",
            caption: "LNER Class A4 \"Mallard\"<br>National Railway Museum",
            src: "https://i.ibb.co/DfCZK7j1/AP1-Gcz-Mf8-Dafp8-KVxh-Onsf-DPhl-YGCd-MPUoc-PJMg-VT4g7sk-AYyx-G-npfou-Xq5-W-WV-CFKm-HHf-DL6x-R5-OYPk.jpg",
            audioSrc: "media/Mallard.mp3",
            featured: false
        },
        {
            title: "KF7 Class",
            caption: "Chinese KF7 Class<br>National Railway Museum",
            src: "https://i.ibb.co/NHyxcYM/AP1-Gcz-NSrq-G1-TIW9mj-Hp-X2-JXa-JUUvr6i3-Ze-FOf-NUj-UDBaj-Q-r-Xrs-J9jkl-UPYCto-JBO4t-BABo001-WQ9-Vz.jpg",
            audioSrc: "media/KF7.mp3",
            featured: false
        },
        {
            title: "Boxhill",
            caption: "LB&SCR A1 Class \"Boxhill\"<br>National Railway Museum",
            src: "https://i.ibb.co/8gwmmyWw/AP1-Gcz-Mwf7-J-j3s11-Fl-Oew-I2-Hmx-Irgm-I-epf5-W3veg-C1-GJin0swi-Mmf-TQKRr-Ab-NX2r-Qa-NOMTx-Xl-M1-n.jpg",
            audioSrc: "media/Boxhill.mp3",
            featured: false
        },
        {
            title: "Stirling Single",
            caption: "GNR Class A2 Stirling Single on the turntable<br>National Railway Museum<br><em>My favorite photo!</em>",
            src: "https://i.ibb.co/mCk6qn9k/AP1-Gcz-MOL-Eg-KBy-KWEQOCvrq-XIZp-Iz-V7-Xn-M72-A2-TC3-S4-M33-GJx-IGgghp-FOy-NBGr9uq-Vn86aqk6-Abq4-DD.jpg",
            audioSrc: "media/StirlingSingle.mp3",
            featured: true
        },
        {
            title: "Rocket",
            caption: "Replica of Stephenson's Rocket<br>National Railway Museum",
            src: "https://i.ibb.co/m5Lc5yHv/AP1-Gcz-Pz9p-RHa-U45hk-DB57-Yu4-x6-PT1-J3yw-H1r-Bxo-Cy-AIbi-K-AEps3-XYn1-Jq-W3-NDIJBc-VT08-JD2-MImlp.jpg",
            audioSrc: "media/Rocket.mp3",
            featured: false
        },
        {
            title: "Duchess of Hamilton",
            caption: "LMS Coronation Class \"Duchess of Hamilton\"<br>National Railway Museum",
            src: "https://i.ibb.co/9H5VPvyP/AP1-Gcz-NOKveq-nl3qrb-Agl-HBg-Hjf-ROO4pm-Vu-FFgd-Pw3aamruu5q-Gv-JGRzn-Kz-H5a-K7-G4d-P5ypcb2ll-VJVvj.jpg",
            audioSrc: "media/DuchessofHamilton.mp3",
            featured: false
        },
        {
            title: "James Spooner",
            caption: "\"James Spooner\" Double Fairlie<br>Ffestiniog Railway, Wales",
            src: "https://i.ibb.co/G3pd6j7C/AP1-Gcz-OR04-VD-Zq-GBF005zd-XD2m-Oj-FZZZgv-So-EN3d-UTl-JAs-Ro-Qr-LKw-KQGXMdgw-Pyg-Qm0w-FQw-Wwtx-Je-S.jpg",
            audioSrc: "media/JamesSpooner.mp3",
            featured: false
        },
        {
            title: "NGG16 130",
            caption: "NGG16 Class Garratt No. 130<br>Welsh Highland Railway, Wales",
            src: "https://i.ibb.co/q274mKm/1000114673-4025f027-4d92-41ca-81ec-5adc5dc358fb-png.jpg",
            audioSrc: "media/NGG16.mp3",
            featured: false
        }
    ];

    const container = document.getElementById('gallery-scroll-container');

    // Inject Items
    galleryItems.forEach((item, index) => {
        const artPiece = document.createElement('div');
        artPiece.className = `art-piece ${item.featured ? 'featured' : ''}`;

        let frameStyle = 'frame-wood';
        if (!item.featured) {
            if (index % 3 === 1) frameStyle = 'frame-dark-wood';
            if (index % 3 === 2) frameStyle = 'frame-black';
        }

        artPiece.innerHTML = `
            <div class="frame ${frameStyle}">
                <img src="${item.src}" alt="${item.title}" loading="lazy"
                     onerror="this.src='https://placehold.co/300x200/4a2a0a/d4af37?text=Image+Unavailable'">
            </div>
            <div class="plaque">
                <p>${item.caption}</p>
            </div>
            ${item.audioSrc ? `<button class="audio-btn" data-src="${item.audioSrc}" title="Play Audio Guide">🔊</button>` : ''}
        `;
        container.appendChild(artPiece);
    });

    // View Controls (Grid/Carousel + Captions)
    const gridBtn = document.getElementById('view-grid');
    const carouselBtn = document.getElementById('view-carousel');
    const captionsBtn = document.getElementById('toggle-captions');

    function setActiveView(mode) {
        if (mode === 'carousel') {
            container.classList.add('gallery-carousel');
            container.classList.remove('gallery-grid');
            carouselBtn?.classList.add('active');
            gridBtn?.classList.remove('active');
        } else {
            container.classList.remove('gallery-carousel');
            container.classList.add('gallery-grid');
            gridBtn?.classList.add('active');
            carouselBtn?.classList.remove('active');
        }
    }

    gridBtn?.addEventListener('click', () => setActiveView('grid'));
    carouselBtn?.addEventListener('click', () => setActiveView('carousel'));

    captionsBtn?.addEventListener('click', () => {
        container.classList.toggle('gallery-hide-captions');
        captionsBtn.textContent = container.classList.contains('gallery-hide-captions')
            ? 'Show Captions'
            : 'Hide Captions';
    });

    setActiveView('grid');

    // Audio Logic
    const musicBtn = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const bgAudio = document.getElementById('bg-music');
    const voiceAudio = document.getElementById('voice-player');
    let isMusicPlaying = false;

    // Toggle Background Music
    if (musicBtn) {
        musicBtn.addEventListener('click', () => {
            if (!isMusicPlaying) {
                bgAudio.volume = 0.4;
                bgAudio.play().then(() => {
                    isMusicPlaying = true;
                    musicIcon.textContent = "⏸";
                    musicBtn.innerHTML = '<span id="music-icon">⏸</span> Pause Ambience';
                    musicBtn.classList.add('bg-[#d4af37]', 'text-white');
                }).catch(e => console.log("Audio play failed", e));
            } else {
                bgAudio.pause();
                isMusicPlaying = false;
                musicIcon.textContent = "▶";
                musicBtn.innerHTML = '<span id="music-icon">▶</span> Play Gallery Ambience';
                musicBtn.classList.remove('bg-[#d4af37]', 'text-white');
            }
        });
    }

    // Play Voice Note
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.audio-btn');
        if (btn) {
            voiceAudio.pause();
            if (isMusicPlaying) bgAudio.pause();
            voiceAudio.src = btn.dataset.src;
            voiceAudio.play();
        }
    });

    // Resume Music
    voiceAudio.addEventListener('ended', () => {
        if (isMusicPlaying) bgAudio.play();
    });
}

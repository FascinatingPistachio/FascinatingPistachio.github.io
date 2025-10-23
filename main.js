// Combined JavaScript for better performance

// Set current date in footer
document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'short', 
  day: 'numeric' 
});

// Navigation functionality - FIXED JUMPING ISSUE
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const content = document.getElementById('content');
  const loading = document.getElementById('loading');
  
  // Preload first section for faster loading
  loadSection('home');
  
  // Function to load section content
  async function loadSection(sectionId) {
    loading.style.display = 'block';
    content.innerHTML = '';
    
    try {
      // Simple inline content for speed - no external file loading
      const sections = {
        home: `
          <section id="home" class="content-section">
            <div class="title2">
              <img src="https://i.ibb.co/cKzcCzfk/image.png" alt="Shadow Emblem" class="header-img">
              Welcome to My Website!
            </div>
            <p>Hey there! I'm <span class="highlight">Aaron</span>, and this is my little corner of the internet. I'm a huge fan of Shadow the Hedgehog, gaming, anime, trains and a lot of other things. Feel free to look around!</p>
            <div class="separator"></div>
            <div class="title2">My Interests & Hobbies</div>
            <p>I'm really into <span class="highlight">painting Warhammer 40,000 miniatures</span>, <span class="highlight">modding old consoles</span> like my Nintendo Switch and Wii U, and I absolutely love visiting railway museums to see historic trains up close!</p>
            <div class="separator"></div>
            <div class="title2">My Gaming Collection</div>
            <p>I have quite a few consoles (Some are my dad's):</p>
            <ul class="content-list">
              <li>Nintendo 64</li>
              <li>Nintendo GameCube</li>
              <li>Nintendo Wii U</li>
              <li>Nintendo Switch</li>
              <li>Nintendo Switch 2</li>
              <li>Legend of Zelda Game & Watch</li>
              <li>Super Mario Game & Watch (RIP - lost it somewhere!)</li>
            </ul>
            <div class="separator"></div>
            <div class="title2">Currently Playing</div>
            <p>Usually jumping between <span class="highlight">Fortnite</span>, <span class="highlight">Roblox</span>, and <span class="highlight">Brawl Stars</span> online. Offline, I'm playing <span class="highlight">Super Mario Galaxy</span> on my Nintendo Switch 2. :)</p>
          </section>
        `,
        about: `
          <section id="about" class="content-section">
            <div class="title2">
              <img src="https://i.ibb.co/cKzcCzfk/image.png" alt="Shadow Emblem" class="header-img">
              About Me
            </div>
            <p>I'm Aaron, a gaming and anime enthusiast who loves all things Nintendo, retro gaming, and trains! When I'm not playing games, I'm usually painting miniatures, modding consoles, visiting railway museums, or messing around with websites!</p>
            <div class="separator"></div>
            <div class="title2">My Interests</div>
            <p>I'm passionate about several hobbies:</p>
            <ul class="content-list">
              <li><span class="highlight">Gaming</span> - Nintendo games, Fortnite, Roblox, and retro consoles</li>
              <li><span class="highlight">Trains</span> - I love visiting railway museums and heritage lines</li>
              <li><span class="highlight">Anime</span> - Big fan of action and adventure series</li>
              <li><span class="highlight">Warhammer 40K</span> - Painting miniatures and building armies</li>
              <li><span class="highlight">Console Modding</span> - Bringing new life to older hardware</li>
              <li><span class="highlight">Shadow the Hedgehog</span> - My favorite video game character!</li>
            </ul>
            <div class="separator"></div>
            <div class="title2">My Setup</div>
            <p>I game on a variety of consoles but primarily use my Nintendo Switch 2 and my modded Nintendo Switch. I also have a few retro consoles that I enjoy playing on. When I'm not gaming, you can often find me at the National Railway Museum admiring the locomotives!</p>
          </section>
        `,
        gallery: `
          <section id="gallery" class="content-section">
            <div class="title2">
              <img src="https://i.ibb.co/cKzcCzfk/image.png" alt="Shadow Emblem" class="header-img">
              Train Gallery
            </div>
            <p>Here are some trains I've photographed up close at various railway museums and heritage lines. I love visiting these amazing pieces of history!</p>
            <div class="separator"></div>
            <div class="title2">National Railway Museum Collection</div>
            <div class="gallery-grid">
              <div class="gallery-item">
                <div class="gallery-image-container">
                  <img src="https://i.ibb.co/JF5PTXW7/AP1-Gcz-MOO4-MOzy3-V-L7c-Xe-Jsxc-XDgqe9-JDHs-TJK-Qy-Ln-PKVj-Qj-NFBGNHV6-E6i-W-Yw2-H6-JS5s-Lg-exxah-R.jpg" alt="Henry Oakley" class="gallery-image">
                </div>
                <div class="gallery-caption">GNR Class C1 "Henry Oakley"<br>National Railway Museum</div>
              </div>
              <div class="gallery-item">
                <div class="gallery-image-container">
                  <img src="https://i.ibb.co/DfCZK7j1/AP1-Gcz-Mf8-Dafp8-KVxh-Onsf-DPhl-YGCd-MPUoc-PJMg-VT4g7sk-AYyx-G-npfou-Xq5-W-WV-CFKm-HHf-DL6x-R5-OYPk.jpg" alt="Mallard" class="gallery-image">
                </div>
                <div class="gallery-caption">LNER Class A4 "Mallard"<br>National Railway Museum</div>
              </div>
              <div class="gallery-item">
                <div class="gallery-image-container">
                  <img src="https://i.ibb.co/NHyxcYM/AP1-Gcz-NSrq-G1-TIW9mj-Hp-X2-JXa-JUUvr6i3-Ze-FOf-NUj-UDBaj-Q-r-Xrs-J9jkl-UPYCto-JBO4t-BABo001-WQ9-Vz.jpg" alt="KF7 Class" class="gallery-image">
                </div>
                <div class="gallery-caption">Chinese KF7 Class<br>National Railway Museum</div>
              </div>
              <div class="gallery-item">
                <div class="gallery-image-container">
                  <img src="https://i.ibb.co/8gwmmyWw/AP1-Gcz-Mwf7-J-j3s11-Fl-Oew-I2-Hmx-Irgm-I-epf5-W3veg-C1-GJin0swi-Mmf-TQKRr-Ab-NX2r-Qa-NOMTx-Xl-M1-n.jpg" alt="Boxhill" class="gallery-image">
                </div>
                <div class="gallery-caption">LB&SCR A1 Class "Boxhill"<br>National Railway Museum</div>
              </div>
              <div class="gallery-item featured">
                <div class="gallery-image-container">
                  <img src="https://i.ibb.co/mCk6qn9k/AP1-Gcz-MOL-Eg-KBy-KWEQOCvrq-XIZp-Iz-V7-Xn-M72-A2-TC3-S4-M33-GJx-IGgghp-FOy-NBGr9uq-Vn86aqk6-Abq4-DD.jpg" alt="Stirling Single" class="gallery-image">
                </div>
                <div class="gallery-caption">GNR Class A2 Stirling Single on the turntable<br>National Railway Museum<br><em>My favorite photo!</em></div>
              </div>
              <div class="gallery-item">
                <div class="gallery-image-container">
                  <img src="https://i.ibb.co/m5Lc5yHv/AP1-Gcz-Pz9p-RHa-U45hk-DB57-Yu4-x6-PT1-J3yw-H1r-Bxo-Cy-AIbi-K-AEps3-XYn1-Jq-W3-NDIJBc-VT08-JD2-MImlp.jpg" alt="Stephenson's Rocket" class="gallery-image">
                </div>
                <div class="gallery-caption">Replica of Stephenson's Rocket<br>National Railway Museum</div>
              </div>
              <div class="gallery-item">
                <div class="gallery-image-container">
                  <img src="https://i.ibb.co/9H5VPvyP/AP1-Gcz-NOKveq-nl3qrb-Agl-HBg-Hjf-ROO4pm-Vu-FFgd-Pw3aamruu5q-Gv-JGRzn-Kz-H5a-K7-G4d-P5ypcb2ll-VJVvj.jpg" alt="Coronation Class" class="gallery-image">
                </div>
                <div class="gallery-caption">LMS Coronation Class<br>National Railway Museum</div>
              </div>
              <div class="gallery-item">
                <div class="gallery-image-container">
                  <img src="https://i.ibb.co/G3pd6j7C/AP1-Gcz-OR04-VD-Zq-GBF005zd-XD2m-Oj-FZZZgv-So-EN3d-UTl-JAs-Ro-Qr-LKw-KQGXMdgw-Pyg-Qm0w-FQw-Wwtx-Je-S.jpg" alt="James Spooner" class="gallery-image">
                </div>
                <div class="gallery-caption">"James Spooner" Double Fairlie<br>Ffestiniog Railway, Wales</div>
              </div>
            </div>
            <div class="separator"></div>
            <div class="title2">About These Photos</div>
            <p>Most photos were taken at the National Railway Museum in York, with the Double Fairlie from the Ffestiniog Railway in Wales. The Stirling Single on the turntable is my absolute favorite shot - I was lucky to capture it at just the right moment!</p>
            <div class="separator"></div>
            <div class="title2">My Gaming Corner</div>
            <p>Gaming screenshots will be here soon!</p>
          </section>
        `,
        links: `
          <section id="links" class="content-section">
            <div class="title2">
              <img src="https://i.ibb.co/cKzcCzfk/image.png" alt="Shadow Emblem" class="header-img">
              Links & Resources
            </div>
            <p>Here are some useful links and resources I recommend:</p>
            <div class="separator"></div>
            <div class="title2">Gaming Resources</div>
            <ul class="content-list">
              <li><a href="https://nintendo.co.uk" target="_blank">Nintendo's Official UK Site</a></li>
              <li><a href="https://www.games-workshop.com" target="_blank">Warhammer Official</a></li>
              <li><a href="https://gamebanana.com" target="_blank">Gamebanana</a></li>
              <li><a href="https://www.allkeyshop.com/blog/en-gb/" target="_blank">Allkeyshop</a></li>
            </ul>
            <div class="separator"></div>
            <div class="title2">Railway Resources</div>
            <ul class="content-list">
              <li><a href="https://www.railwaymuseum.org.uk/" target="_blank">National Railway Museum</a></li>
              <li><a href="https://www.festrail.co.uk/" target="_blank">Ffestiniog Railway</a></li>
            </ul>
            <div class="separator"></div>
            <div class="title2">Anime Recommendations</div>
            <p>I absolutely love anime! Here are some of my top recommendations:</p>
            <div class="anime-grid">
              <div class="anime-item">
                <a href="https://bentoroll.vercel.app/series.html?series=dr-stone" target="_blank">
                  <img src="https://i.ibb.co/bMptFwVN/60930bac0d6c0.jpg" alt="Dr. Stone" class="anime-thumbnail">
                  <div class="anime-title">Dr. Stone</div>
                </a>
              </div>
              <div class="anime-item">
                <img src="https://i.ibb.co/7NRrqKF1/MV5-BMWU1-OGEw-Nm-Qt-NGM3-MS00-YTYy-LThm-Ym-Mt-N2-Fj-Yz-Qz-Nz-Nm-NTE0-Xk-Ey-Xk-Fqc-Gc-V1.jpg" alt="Demon Slayer" class="anime-thumbnail">
                <div class="anime-title">Demon Slayer</div>
              </div>
              <div class="anime-item">
                <img src="https://i.ibb.co/tTH2JGcg/MV5-BYTgy-ZDhm-MTEt-ZDFh-Ni00-MTc4-LTg3-Nj-Ut-YWJl-NGE5-Mzk2-Nz-Mx-Xk-Ey-Xk-Fqc-Gc-V1.jpg" alt="Death Note" class="anime-thumbnail">
                <div class="anime-title">Death Note</div>
              </div>
              <div class="anime-item">
                <a href="https://bentoroll.vercel.app/series.html?series=gachiakuta" target="_blank">
                  <img src="https://i.ibb.co/XZj5cQcR/MV5-BZDU5-Zm-Ez-ODYt-MDU2-OS00-NTZi-LTk4-MWYt-YWUy-ZWUz-NGU2-ODdj-Xk-Ey-Xk-Fqc-Gc-V1.jpg" alt="Gachiakuta" class="anime-thumbnail">
                  <div class="anime-title">Gachiakuta</div>
                </a>
              </div>
              <div class="anime-item">
                <img src="https://i.ibb.co/cSwpjr3R/MV5-BM2-M4-Yzdk-MTEt-Mj-Uy-Yy00-ZWY0-LWI5-ODQt-NGRk-ZWQ1-Mz-U5-MWM2-Xk-Ey-Xk-Fqc-Gc-V1.jpg" alt="Solo Leveling" class="anime-thumbnail">
                <div class="anime-title">Solo Leveling</div>
              </div>
              <div class="anime-item">
                <img src="https://i.ibb.co/1YFRvyCC/MV5-BOTky-Mz-A2-OWIt-NDlj-My00-Yj-Rk-LWFj-NGQt-ZTcy-Mzk4-Zm-U4-Mj-I2-Xk-Ey-Xk-Fqc-Gc-V1.jpg" alt="High Card" class="anime-thumbnail">
                <div class="anime-title">High Card</div>
              </div>
            </div>
          </section>
        `
      };
      
      content.innerHTML = sections[sectionId] || '<p>Section not found.</p>';
      loading.style.display = 'none';
      
      // Protect gallery images when gallery is shown
      if (sectionId === 'gallery') {
        protectGalleryImages();
      }
    } catch (error) {
      console.error('Error loading section:', error);
      content.innerHTML = '<p>Error loading content. Please try again.</p>';
      loading.style.display = 'none';
    }
  }
  
  // Function to show a specific section - FIXED JUMPING
  function showSection(sectionId) {
    loadSection(sectionId);
    
    // Update active nav link
    navLinks.forEach(link => {
      if (link.getAttribute('data-section') === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
    
    // FIXED: Prevent URL hash from causing page jump
    if (history.pushState) {
      history.pushState(null, null, '#' + sectionId);
    } else {
      window.location.hash = '#' + sectionId;
    }
  }
  
  // Add click event listeners to nav links - FIXED JUMPING
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // This prevents the default anchor behavior
      const sectionId = this.getAttribute('data-section');
      showSection(sectionId);
    });
  });
  
  // Load section based on URL hash - FIXED to not jump
  function loadInitialSection() {
    const hash = window.location.hash.substring(1);
    const validSections = ['home', 'about', 'gallery', 'links'];
    
    if (validSections.includes(hash)) {
      showSection(hash);
    } else {
      showSection('home');
    }
  }
  
  // Show home section by default
  loadInitialSection();
});

// Gallery image protection
function protectGalleryImages() {
  const galleryItems = document.querySelectorAll('.gallery-image-container');
  
  galleryItems.forEach(container => {
    // Prevent right-click
    container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
    
    // Prevent drag
    container.addEventListener('dragstart', (e) => {
      e.preventDefault();
      return false;
    });
  });
}

// Konami Code Easter Egg
const konamiCode = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];
let konamiIndex = 0;

function handleKeyDown(event) {
  const requiredKey = konamiCode[konamiIndex];
  if (event.key === requiredKey) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
}

function triggerEasterEgg() {
  document.getElementById('easter-egg').style.display = 'block';
}

function closeEasterEgg() {
  document.getElementById('easter-egg').style.display = 'none';
}

document.addEventListener('keydown', handleKeyDown);
document.getElementById('easter-egg-close').addEventListener('click', closeEasterEgg);

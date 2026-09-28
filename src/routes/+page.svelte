<script lang="ts">
  import { onMount } from 'svelte';
  import { wedding, weddingDate } from '$lib/wedding';
  import PetalBurst from '$lib/components/PetalBurst.svelte';
  import ImageSlot from '$lib/components/ImageSlot.svelte';

  let opened = false;
  let petals = false;
  let musicOn = false;
  let activeSection = 'home';
  let audio: HTMLAudioElement | null = null;

  let countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  const sections = ['home', 'invitation', 'muhurtham', 'reception', 'countdown'];

  function openInvitation() {
    opened = true;
    petals = false;
    requestAnimationFrame(() => {
      petals = true;
    });

    setTimeout(() => {
      document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
    }, 650);

    setTimeout(() => (petals = false), 4700);
  }

  function updateCountdown() {
    const diff = Math.max(0, weddingDate.getTime() - Date.now());
    const total = Math.floor(diff / 1000);

    countdown = {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      minutes: Math.floor((total % 3600) / 60),
      seconds: total % 60
    };
  }

  function toggleMusic() {
    if (!audio) return;

    if (musicOn) {
      audio.pause();
      musicOn = false;
    } else {
      audio.play().then(() => (musicOn = true)).catch(() => (musicOn = false));
    }
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  onMount(() => {
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeSection = entry.target.id;
        }
      },
      { threshold: 0.45 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Great+Vibes&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
</svelte:head>

<PetalBurst active={petals} />



<nav class="nav" class:visible={opened}>
  <button class="brand" onclick={() => scrollTo('home')} aria-label="Home">K <span>♡</span> N</button>
  <div class="nav-links">
    <button class:active={activeSection === 'invitation'} onclick={() => scrollTo('invitation')}>Invitation</button>
    <button class:active={activeSection === 'muhurtham'} onclick={() => scrollTo('muhurtham')}>Muhurtham</button>
    <button class:active={activeSection === 'reception'} onclick={() => scrollTo('reception')}>Reception</button>
    <button class:active={activeSection === 'countdown'} onclick={() => scrollTo('countdown')}>Countdown</button>
  </div>
  
</nav>

<main>
  <!-- 1. OPENING -->
  <section id="home" class="page opening">
    <div class="border-frame"></div>

    <div class="garland top-garland">
      <span></span><span></span><span></span><span></span><span></span>
    </div>

    <div class="opening-content">
      <p class="eyebrow reveal">With the blessings of our parents and elders</p>

      <div class="ornament">❧ ❧ ❧</div>

      <div class="ganapathi-slot reveal">
        <img
          src="/images/ganapathi.png"
          alt="Ganapathi"
          class="ganapathi-image"
        />
      </div>

      <div class="ornament">❧ ❧ ❧</div>

      <p class="eyebrow reveal delay-1">We joyfully invite you to celebrate the wedding of</p>

      <h1 class="script reveal delay-2">{wedding.bride.name}</h1>
      <p class="family reveal delay-2">{wedding.bride.relation}</p>
      <p class="parents reveal delay-2">{wedding.bride.parents}</p>

      <div class="weds reveal delay-3">
        <span>⟢</span>
        <em>weds</em>
        <span>⟣</span>
      </div>

      <h1 class="script reveal delay-3">{wedding.groom.name}</h1>
      <p class="family reveal delay-3">{wedding.groom.relation}</p>
      <p class="parents reveal delay-3">{wedding.groom.parents}</p>

      <button class="open-button reveal delay-4" onclick={openInvitation}>
        {opened ? 'Invitation Opened' : 'View Invitation'}
      </button>
      <p class="scroll-hint">Scroll to explore</p>
    </div>

    <!-- IMAGE SLOTS: decorative photography can be dropped into these later -->
    <div class="corner-image left-corner"><img src="/images/floral.png" alt="" /></div>
    <div class="corner-image right-corner"><img src="/images/floral.png" alt="" /></div>
  </section>

  <!-- 2. INVITATION -->
  <section id="invitation" class="page invitation">
    <div class="section-decoration">✦</div>

    <div class="content narrow">
      <p class="eyebrow">With joy in our hearts</p>
      <h2 class="serif-heading">You are cordially invited</h2>
      <div class="gold-rule"></div>

      <p class="body-copy">
        Please join us as Krishna and Nidhun begin their journey together.
        Your presence and blessings will make this celebration even more special.
      </p>

      <div class="couple-lockup">
        <span>{wedding.bride.name}</span>
        <small>&</small>
        <span>{wedding.groom.name}</span>
      </div>

      <div class="date-card">
        <span>{wedding.day}</span>
        <strong>{wedding.dateShort}</strong>
        <span>Wedding Day</span>
      </div>

      <button class="outline-button" onclick={() => scrollTo('muhurtham')}>View Wedding Details ↓</button>
    </div>
  </section>

  <!-- 3. MUHURTHAM -->
  <section id="muhurtham" class="page event-page">
    <div class="content">
      <p class="eyebrow">The auspicious ceremony</p>
      <h2 class="serif-heading">Muhurtham</h2>
      <div class="gold-rule"></div>

      <div class="event-grid">
        <div class="event-card">
          <span class="event-icon">▦</span>
          <p class="label">Date</p>
          <h3>{wedding.day}</h3>
          <p>{wedding.date}</p>
        </div>

        <div class="event-card">
          <span class="event-icon">◷</span>
          <p class="label">Time</p>
          <h3>{wedding.muhurtham.time}</h3>
        </div>
      </div>

      <div class="venue-card">
        <p class="label">Venue</p>
        <h3>{wedding.muhurtham.venue}</h3>
        <p>{wedding.muhurtham.location}</p>
        <button class="map-button" onclick={() => window.open('https://www.google.com/maps/search/?api=1&query=Alakananda+Backwater+Resort+and+Homestay+Vadanappally', '_blank')}>Open in Maps ↗</button>
      </div>
    </div>
  </section>

  <!-- 4. RECEPTION -->
  <section id="reception" class="page reception-page">
    <div class="content">
      <p class="eyebrow">The celebration continues</p>
      <h2 class="serif-heading">Reception</h2>
      <div class="gold-rule"></div>

      <div class="reception-details">
        <div>
          <p class="label">Date</p>
          <h3>{wedding.day}</h3>
          <p>{wedding.date}</p>
        </div>

        <div>
          <p class="label">Time</p>
          <h3>{wedding.reception.time}</h3>
        </div>

        <div class="full">
          <p class="label">Venue</p>
          <h3>{wedding.reception.venue}</h3>
          <p>{wedding.reception.location}</p>
          <button class="map-button" onclick={() => window.open('https://www.google.com/maps/search/?api=1&query=St.+John+the+Baptist+Church+Hall+Kodakara', '_blank')}>Open in Maps ↗</button>
        </div>
      </div>
    </div>
  </section>

  <!-- 5. COUNTDOWN -->
  <section id="countdown" class="page countdown-page">
    <div class="content">
      <p class="eyebrow">Counting the moments</p>
      <h2 class="serif-heading">Until we say “I do”</h2>
      <div class="gold-rule"></div>

      <div class="countdown">
        <div><strong>{String(countdown.days).padStart(2, '0')}</strong><span>Days</span></div>
        <div><strong>{String(countdown.hours).padStart(2, '0')}</strong><span>Hours</span></div>
        <div><strong>{String(countdown.minutes).padStart(2, '0')}</strong><span>Minutes</span></div>
        <div><strong>{String(countdown.seconds).padStart(2, '0')}</strong><span>Seconds</span></div>
      </div>

      <div class="closing">
        <div class="ornament">❧ ✦ ❧</div>
        <h2 class="script">{wedding.bride.name} & {wedding.groom.name}</h2>
        <p>12 December 2026</p>
        <p class="small">Sharing the happiness: Vishnu, friends and family.</p>
      </div>
    </div>
  </section>
</main>

<style>
  .nav {
    position: fixed;
    z-index: 90;

    top: 16px;
    left: 50%;
    width: min(900px, calc(100% - 28px));

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    padding: 9px 12px;

    border: 1px solid rgba(141, 44, 32, 0.18);
    border-radius: 999px;

    background: rgba(245, 234, 216, 0.88);
    backdrop-filter: blur(12px);

    box-shadow: 0 8px 30px rgba(90, 50, 20, 0.08);

    opacity: 0;
    pointer-events: none;

    transform: translate(-50%, -140%);

    transition:
      transform 0.55s cubic-bezier(.2, .7, .2, 1),
      opacity 0.4s ease;
  }

  .nav.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, 0);
  }

  .brand {
    border: 0;
    background: none;

    color: #8d2c20;
    cursor: pointer;

    font-family: "Great Vibes", cursive;
    font-size: 27px;

    padding: 0 8px;
  }

  .brand span {
    font-family: serif;
    font-size: 15px;
  }

  .nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
  }

  .nav-links button {
    border: 0;
    background: none;

    padding: 7px 9px;

    color: #8d2c20;
    cursor: pointer;

    font-size: 8px;
    text-transform: uppercase;
    letter-spacing: 0.14em;

    opacity: 0.55;

    transition:
      opacity 0.25s ease,
      transform 0.25s ease;
  }

  .nav-links button:hover {
    opacity: 1;
    transform: translateY(-1px);
  }

  .nav-links button.active {
    opacity: 1;
  }

  .music {
    width: 30px;
    height: 30px;

    border: 1px solid rgba(141, 44, 32, 0.2);
    border-radius: 50%;

    background: transparent;

    color: #8d2c20;
    cursor: pointer;
  }

  .music:hover {
    background: #8d2c20;
    color: #f5ead8;
  }

  /* MOBILE */
  @media (max-width: 700px) {
    .nav {
      top: 12px;
      bottom: auto;

      width: calc(100% - 24px);

      padding: 7px 8px;
      gap: 4px;
    }

    .nav .brand {
      display: none;
    }

    .nav-links {
      flex: 1;
      justify-content: space-evenly;
      gap: 0;
    }

    .nav-links button {
      padding: 7px 5px;
      font-size: 7px;
      letter-spacing: 0.1em;
    }

    .music {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
    }
  }
</style>
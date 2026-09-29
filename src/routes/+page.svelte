<script lang="ts">
  import { onMount } from 'svelte';
  import { wedding, weddingDate } from '$lib/wedding';
  import PetalBurst from '$lib/components/PetalBurst.svelte';

  let opened = false;
  let petals = false;
  let activeSection = 'home';

  // 0 = opening only, 1 = invitation, 2 = muhurtham,
  // 3 = reception, 4 = countdown, 5 = RSVP.
  let unlockedStage = 0;

  let rsvpSubmitted = false;
  let rsvpSubmitting = false;
  let rsvpError = '';
  let rsvpAttending = '';
  let rsvpName = '';
  let rsvpContact = '';
  let rsvpGuests = 1;
  let rsvpMessage = '';
  let rsvpWebsite = '';
  let cardModalOpen = false;

  let countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  const sections = ['home', 'invitation', 'muhurtham', 'reception', 'countdown', 'rsvp'];

  function openInvitation() {
    if (opened) return;

    opened = true;
    unlockedStage = 1;
    petals = false;

    requestAnimationFrame(() => {
      petals = true;
    });

    setTimeout(() => {
      document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' });
    }, 80);

    setTimeout(() => (petals = false), 4700);
  }

  function unlockAndGo(stage: number, id: string) {
    if (stage > unlockedStage + 1) return;

    unlockedStage = Math.max(unlockedStage, stage);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    });
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

  function scrollTo(id: string, stage: number) {
    if (stage > unlockedStage) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function openCardModal() {
    cardModalOpen = true;
  }

  function closeCardModal() {
    cardModalOpen = false;
  }

  async function submitRsvp() {
    rsvpError = '';

    if (!rsvpName.trim() || !rsvpAttending || rsvpSubmitting) return;

    rsvpSubmitting = true;

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: rsvpName.trim(),
          contact: rsvpContact.trim(),
          attending: rsvpAttending === 'yes',
          guestCount: rsvpAttending === 'yes' ? Number(rsvpGuests) || 1 : 0,
          message: rsvpMessage.trim(),
          website: rsvpWebsite
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.error || 'We could not save your RSVP. Please try again.');
      }

      rsvpSubmitted = true;
    } catch (error) {
      rsvpError = error instanceof Error
        ? error.message
        : 'We could not save your RSVP. Please try again.';
    } finally {
      rsvpSubmitting = false;
    }
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
  <button class="brand" onclick={() => scrollTo('home', 0)} aria-label="Home">K <span>♡</span> N</button>

  <div class="nav-links">
    {#if unlockedStage >= 1}
      <button class:active={activeSection === 'invitation'} onclick={() => scrollTo('invitation', 1)}>Invitation</button>
    {/if}
    {#if unlockedStage >= 2}
      <button class:active={activeSection === 'muhurtham'} onclick={() => scrollTo('muhurtham', 2)}>Muhurtham</button>
    {/if}
    {#if unlockedStage >= 3}
      <button class:active={activeSection === 'reception'} onclick={() => scrollTo('reception', 3)}>Reception</button>
    {/if}
    {#if unlockedStage >= 4}
      <button class:active={activeSection === 'countdown'} onclick={() => scrollTo('countdown', 4)}>Countdown</button>
    {/if}
    {#if unlockedStage >= 5}
      <button class:active={activeSection === 'rsvp'} onclick={() => scrollTo('rsvp', 5)}>RSVP</button>
    {/if}
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
        <img src="/images/ganapathi.png" alt="Ganapathi" class="ganapathi-image" />
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

      {#if !opened}
        <p class="scroll-hint">Open the invitation to continue</p>
      {/if}
    </div>

  </section>

  {#if unlockedStage >= 1}
    <!-- 2. INVITATION -->
    <section id="invitation" class="page invitation">
      <div class="section-decoration">✦</div>

      <div class="content narrow">
        <p class="eyebrow">With joy in our hearts</p>
        <h2 class="serif-heading">You are cordially invited</h2>
        <div class="gold-rule"></div>

        <p class="body-copy">
          With the blessings of their families, Krishna and Nidhun invite you
          to share in the joy of their wedding celebration.
        </p>

        <div class="couple-photo-wrap">
          <div class="couple-photo-frame">
            <img src="/images/couple.png" alt="Krishna and Nidhun" class="couple-photo" />
          </div>
          <p class="couple-photo-caption">Krishna &amp; Nidhun</p>
        </div>

        <div class="date-card">
          <span>{wedding.day}</span>
          <strong>{wedding.dateShort}</strong>
          <span>Wedding Day</span>
        </div>

        <button class="card-button" onclick={openCardModal}>
          View Card
        </button>

        <button class="outline-button" onclick={() => unlockAndGo(2, 'muhurtham')}>
          View Wedding Details <span>↓</span>
        </button>
      </div>
    </section>
  {/if}

  {#if unlockedStage >= 2}
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

          <button
            class="map-button"
            onclick={() => window.open('https://www.google.com/maps/search/?api=1&query=Alakananda+Backwater+Resort+and+Homestay+Vadanappally', '_blank')}
          >
            Open in Maps ↗
          </button>
        </div>

        <button class="continue-button" onclick={() => unlockAndGo(3, 'reception')}>
          Continue to Reception <span>→</span>
        </button>
      </div>
    </section>
  {/if}

  {#if unlockedStage >= 3}
    <!-- 4. RECEPTION -->
    <section id="reception" class="page reception-page">
      <div class="gold-glow"></div>

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

            <button
              class="map-button"
              onclick={() => window.open('https://www.google.com/maps/search/?api=1&query=St.+John+the+Baptist+Church+Hall+Kodakara', '_blank')}
            >
              Open in Maps ↗
            </button>
          </div>
        </div>

        <button class="continue-button gold-button" onclick={() => unlockAndGo(4, 'countdown')}>
          Continue <span>→</span>
        </button>
      </div>
    </section>
  {/if}

  {#if unlockedStage >= 4}
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
        </div>

        <button class="continue-button" onclick={() => unlockAndGo(5, 'rsvp')}>
          RSVP <span>→</span>
        </button>
      </div>
    </section>
  {/if}

  {#if unlockedStage >= 5}
    <!-- 6. RSVP -->
    <section id="rsvp" class="page rsvp-page">
      <div class="content narrow">
        {#if !rsvpSubmitted}
          <p class="eyebrow">A little note from you</p>
          <h2 class="serif-heading">Will you join us?</h2>
          <div class="gold-rule"></div>

          <p class="body-copy rsvp-intro">
            Please let us know whether you will be able to celebrate this special day with us.
          </p>

          <form class="rsvp-form" onsubmit={(event) => { event.preventDefault(); submitRsvp(); }}>
            <div class="honeypot" aria-hidden="true">
              <label>
                Website
                <input type="text" tabindex="-1" autocomplete="off" bind:value={rsvpWebsite} />
              </label>
            </div>
            <div class="attendance-options">
              <label class:chosen={rsvpAttending === 'yes'}>
                <input type="radio" name="attending" value="yes" bind:group={rsvpAttending} />
                <span class="radio-mark"></span>
                <span>Yes, I'll be there</span>
              </label>

              <label class:chosen={rsvpAttending === 'no'}>
                <input type="radio" name="attending" value="no" bind:group={rsvpAttending} />
                <span class="radio-mark"></span>
                <span>Sorry, I can't make it</span>
              </label>
            </div>

            <label class="field">
              <span>Your name</span>
              <input type="text" bind:value={rsvpName} placeholder="Enter your name" required />
            </label>

            <label class="field">
              <span>Phone / Email</span>
              <input type="text" bind:value={rsvpContact} placeholder="How can we reach you?" />
            </label>

            {#if rsvpAttending === 'yes'}
              <label class="field">
                <span>Number of guests</span>
                <input type="number" min="1" max="20" bind:value={rsvpGuests} />
              </label>
            {/if}

            <label class="field">
              <span>Message <small>(optional)</small></span>
              <textarea bind:value={rsvpMessage} rows="4" placeholder="A message for the couple..."></textarea>
            </label>

            {#if rsvpError}
              <p class="form-error" role="alert">{rsvpError}</p>
            {/if}

            <button class="submit-button" type="submit" disabled={rsvpSubmitting}>
              {rsvpSubmitting ? 'Sending…' : 'Send RSVP'}
            </button>
          </form>
        {:else}
          <div class="rsvp-thankyou">
            <div class="thankyou-symbol">✦</div>
            <p class="eyebrow">Thank you, {rsvpName}</p>
            <h2 class="serif-heading">We are so glad to know.</h2>
            <div class="gold-rule"></div>
            <p class="body-copy">
              Your response has been recorded for now. We look forward to celebrating together.
            </p>
            <div class="ornament">❧ ♡ ❧</div>
          </div>
        {/if}
      </div>
    </section>
  {/if}
</main>

{#if cardModalOpen}
  <div class="card-modal-backdrop" role="presentation" onclick={closeCardModal}>
    <div
      class="card-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation card"
      onclick={(event) => event.stopPropagation()}
    >
      <button class="card-modal-close" aria-label="Close wedding card" onclick={closeCardModal}>×</button>

      <div class="card-modal-image-wrap">
        <img src="/images/wedding-card.png" alt="Wedding invitation card" />
      </div>
    </div>
  </div>
{/if}

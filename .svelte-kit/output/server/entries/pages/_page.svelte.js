import "../../chunks/index-server.js";
import { Tt as fallback, a as ensure_array_like, b as escape_html, n as attr_style, o as head, r as bind_props, t as attr_class } from "../../chunks/server.js";
//#region src/lib/wedding.ts
var wedding = {
	bride: {
		name: "Krishna",
		relation: "Daughter of",
		parents: "Sri. Kishore Kumar & Smt. Ragi Kishore"
	},
	groom: {
		name: "Nidhun",
		relation: "Son of",
		parents: "Sri. Ramachandran & Smt. Mini Ramachandran"
	},
	date: "12 December 2026",
	dateShort: "12 DEC 2026",
	day: "Saturday",
	muhurtham: {
		time: "7:35 AM to 9:00 AM",
		venue: "Alakananda Backwater Resort and Homestay",
		location: "Vadanappally"
	},
	reception: {
		time: "5:00 PM onwards",
		venue: "St. John the Baptist Church Hall",
		location: "Kodakara"
	}
};
//#endregion
//#region src/lib/components/PetalBurst.svelte
function PetalBurst($$renderer, $$props) {
	let petals;
	let active = fallback($$props["active"], false);
	$: petals = active ? Array.from({ length: 75 }, (_, id) => ({
		id,
		left: Math.random() * 100,
		delay: Math.random() * .35,
		duration: 2.1 + Math.random() * 2.2,
		drift: -120 + Math.random() * 240,
		rotate: -360 + Math.random() * 720,
		scale: .55 + Math.random() * .9
	})) : [];
	if (active) {
		$$renderer.push(`<!--[0--><div class="petals svelte-peogy2" aria-hidden="true"><!--[-->`);
		const each_array = ensure_array_like(petals);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let petal = each_array[$$index];
			$$renderer.push(`<span class="petal svelte-peogy2"${attr_style(`left:${petal.left}%;--delay:${petal.delay}s;--duration:${petal.duration}s;--drift:${petal.drift}px;--rotate:${petal.rotate}deg;--scale:${petal.scale}`)}></span>`);
		}
		$$renderer.push(`<!--]--></div>`);
	} else $$renderer.push("<!--[-1-->");
	$$renderer.push(`<!--]-->`);
	bind_props($$props, { active });
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let opened = false;
		let petals = false;
		let countdown = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0
		};
		head("1uha8ag", $$renderer, ($$renderer) => {
			$$renderer.push(`<link rel="preconnect" href="https://fonts.googleapis.com"/> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous"/> <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&amp;family=Great+Vibes&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>`);
		});
		PetalBurst($$renderer, { active: petals });
		$$renderer.push(`<!----> <audio loop="" preload="none" src="/music/wedding.mp3"></audio> <nav${attr_class("nav svelte-1uha8ag", void 0, { "visible": opened })}><button class="brand svelte-1uha8ag" aria-label="Home">K <span class="svelte-1uha8ag">♡</span> N</button> <div class="nav-links svelte-1uha8ag"><button${attr_class("svelte-1uha8ag", void 0, { "active": false })}>Invitation</button> <button${attr_class("svelte-1uha8ag", void 0, { "active": false })}>Muhurtham</button> <button${attr_class("svelte-1uha8ag", void 0, { "active": false })}>Reception</button> <button${attr_class("svelte-1uha8ag", void 0, { "active": false })}>Countdown</button></div> <button class="music svelte-1uha8ag" aria-label="Toggle music">${escape_html("♪")}</button></nav> <main><section id="home" class="page opening"><div class="border-frame"></div> <div class="garland top-garland"><span></span><span></span><span></span><span></span><span></span></div> <div class="opening-content"><p class="eyebrow reveal">With the blessings of our parents and elders</p> <div class="ornament">❧ ❧ ❧</div> <div class="ganapathi-slot reveal"><img src="/images/ganapathi.png" alt="Ganapathi" class="ganapathi-image"/></div> <div class="ornament">❧ ❧ ❧</div> <p class="eyebrow reveal delay-1">We joyfully invite you to celebrate the wedding of</p> <h1 class="script reveal delay-2">${escape_html(wedding.bride.name)}</h1> <p class="family reveal delay-2">${escape_html(wedding.bride.relation)}</p> <p class="parents reveal delay-2">${escape_html(wedding.bride.parents)}</p> <div class="weds reveal delay-3"><span>⟢</span> <em>weds</em> <span>⟣</span></div> <h1 class="script reveal delay-3">${escape_html(wedding.groom.name)}</h1> <p class="family reveal delay-3">${escape_html(wedding.groom.relation)}</p> <p class="parents reveal delay-3">${escape_html(wedding.groom.parents)}</p> <button class="open-button reveal delay-4">${escape_html("View Invitation")}</button> <p class="scroll-hint">Scroll to explore</p></div> <div class="corner-image left-corner"><img src="/images/floral.png" alt=""/></div> <div class="corner-image right-corner"><img src="/images/floral.png" alt=""/></div></section> <section id="invitation" class="page invitation"><div class="section-decoration">✦</div> <div class="content narrow"><p class="eyebrow">With joy in our hearts</p> <h2 class="serif-heading">You are cordially invited</h2> <div class="gold-rule"></div> <p class="body-copy">Please join us as Krishna and Nidhun begin their journey together.
        Your presence and blessings will make this celebration even more special.</p> <div class="couple-lockup"><span>${escape_html(wedding.bride.name)}</span> <small>&amp;</small> <span>${escape_html(wedding.groom.name)}</span></div> <div class="date-card"><span>${escape_html(wedding.day)}</span> <strong>${escape_html(wedding.dateShort)}</strong> <span>Wedding Day</span></div> <button class="outline-button">View Wedding Details ↓</button></div></section> <section id="muhurtham" class="page event-page"><div class="content"><p class="eyebrow">The auspicious ceremony</p> <h2 class="serif-heading">Muhurtham</h2> <div class="gold-rule"></div> <div class="event-grid"><div class="event-card"><span class="event-icon">▦</span> <p class="label">Date</p> <h3>${escape_html(wedding.day)}</h3> <p>${escape_html(wedding.date)}</p></div> <div class="event-card"><span class="event-icon">◷</span> <p class="label">Time</p> <h3>${escape_html(wedding.muhurtham.time)}</h3></div></div> <div class="venue-card"><p class="label">Venue</p> <h3>${escape_html(wedding.muhurtham.venue)}</h3> <p>${escape_html(wedding.muhurtham.location)}</p> <button class="map-button">Open in Maps ↗</button></div></div></section> <section id="reception" class="page reception-page"><div class="content"><p class="eyebrow">The celebration continues</p> <h2 class="serif-heading">Reception</h2> <div class="gold-rule"></div> <div class="reception-details"><div><p class="label">Date</p> <h3>${escape_html(wedding.day)}</h3> <p>${escape_html(wedding.date)}</p></div> <div><p class="label">Time</p> <h3>${escape_html(wedding.reception.time)}</h3></div> <div class="full"><p class="label">Venue</p> <h3>${escape_html(wedding.reception.venue)}</h3> <p>${escape_html(wedding.reception.location)}</p> <button class="map-button">Open in Maps ↗</button></div></div></div></section> <section id="countdown" class="page countdown-page"><div class="content"><p class="eyebrow">Counting the moments</p> <h2 class="serif-heading">Until we say “I do”</h2> <div class="gold-rule"></div> <div class="countdown"><div><strong>${escape_html(String(countdown.days).padStart(2, "0"))}</strong><span>Days</span></div> <div><strong>${escape_html(String(countdown.hours).padStart(2, "0"))}</strong><span>Hours</span></div> <div><strong>${escape_html(String(countdown.minutes).padStart(2, "0"))}</strong><span>Minutes</span></div> <div><strong>${escape_html(String(countdown.seconds).padStart(2, "0"))}</strong><span>Seconds</span></div></div> <div class="closing"><div class="ornament">❧ ✦ ❧</div> <h2 class="script">${escape_html(wedding.bride.name)} &amp; ${escape_html(wedding.groom.name)}</h2> <p>12 December 2026</p> <p class="small">Sharing the happiness: Vishnu, friends and family.</p></div></div></section></main>`);
	});
}
//#endregion
export { _page as default };

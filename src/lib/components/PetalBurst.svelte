<script lang="ts">
  export let active = false;

  type Petal = {
    id: number;
    left: number;
    delay: number;
    duration: number;
    drift: number;
    rotate: number;
    scale: number;
  };

  $: petals = active
    ? Array.from({ length: 75 }, (_, id) => ({
        id,
        left: Math.random() * 100,
        delay: Math.random() * 0.35,
        duration: 2.1 + Math.random() * 2.2,
        drift: -120 + Math.random() * 240,
        rotate: -360 + Math.random() * 720,
        scale: 0.55 + Math.random() * 0.9
      }))
    : [];
</script>

{#if active}
  <div class="petals" aria-hidden="true">
    {#each petals as petal (petal.id)}
      <span
        class="petal"
        style={`left:${petal.left}%;--delay:${petal.delay}s;--duration:${petal.duration}s;--drift:${petal.drift}px;--rotate:${petal.rotate}deg;--scale:${petal.scale}`}
      ></span>
    {/each}
  </div>
{/if}

<style>
  .petals { position: fixed; inset: 0; z-index: 100; pointer-events: none; overflow: hidden; }
  .petal {
    position: absolute;
    top: -12px;
    width: 10px;
    height: 7px;
    border-radius: 70% 30% 70% 30%;
    background: #dc777a;
    animation: fall var(--duration) cubic-bezier(.2,.7,.25,1) var(--delay) forwards;
    transform: scale(var(--scale));
  }
  .petal:nth-child(3n) { background: #f0aaa0; }
  .petal:nth-child(4n) { background: #bd8730; width: 7px; height: 5px; }
  @keyframes fall {
    0% { opacity: 0; transform: translate3d(0,-10vh,0) rotate(0deg) scale(var(--scale)); }
    10% { opacity: .95; }
    100% { opacity: 0; transform: translate3d(var(--drift),110vh,0) rotate(var(--rotate)) scale(var(--scale)); }
  }
</style>
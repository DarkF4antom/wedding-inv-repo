<script lang="ts">
  export let src = '';
  export let alt = '';
  export let label = 'Add image';
  export let className = '';
</script>

{#if src}
  <img {src} {alt} class={className} />
{:else}
  <div class={`image-slot ${className}`} role="img" aria-label={label}>
    <span>{label}</span>
  </div>
{/if}

<style>
  .image-slot {
    display: grid;
    place-items: center;
    min-height: 220px;
    border: 1px dashed rgba(141,44,32,.35);
    background: rgba(255,255,255,.16);
    color: rgba(111,29,23,.55);
    letter-spacing: .18em;
    text-transform: uppercase;
    font-size: 9px;
  }
</style>
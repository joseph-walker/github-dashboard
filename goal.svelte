<SummaryLine icon="/foo.svg">
    <em>5</em>Changed Files
    <svelte:fragment slot="meta">
        <em class="additions">+107</em>
        <em class="deletions">-6</em>
    </svelte:fragment>
</SummaryLine>

<SummaryLine icon="/bar.svg">
    <em>3</em>Reviews
    <ul class="reviews" slot="meta">
        {#each reviews as review}
            <ReviewBadge review={review} />
        {/each}
    </ul>
</SummaryLine>

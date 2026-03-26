<?php get_header(); ?>

<section style="padding: 3rem 0;">
    <div class="container">
        <?php if (have_posts()) : ?>
            <?php while (have_posts()) : the_post(); ?>
                <article style="margin-bottom: 2rem; padding: 1.5rem; border-radius: 1rem; background: var(--card); border: 1px solid var(--card-border);">
                    <h2><a href="<?php the_permalink(); ?>" style="transition: color 0.3s;"><?php the_title(); ?></a></h2>
                    <p style="color: var(--muted); margin-top: 0.5rem;"><?php the_excerpt(); ?></p>
                </article>
            <?php endwhile; ?>
        <?php else : ?>
            <p class="empty-state">Aucun contenu trouvé.</p>
        <?php endif; ?>
    </div>
</section>

<?php get_footer(); ?>

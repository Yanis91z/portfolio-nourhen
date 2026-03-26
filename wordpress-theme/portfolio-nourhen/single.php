<?php
if (get_post_type() === 'realisation') {
    get_template_part('single-realisation');
    return;
}

get_header(); ?>

<section style="padding: 3rem 0;">
    <div class="container container--narrow">
        <?php while (have_posts()) : the_post(); ?>
            <h1 style="font-size:2rem;font-weight:700;margin-bottom:1rem"><?php the_title(); ?></h1>
            <div style="color:var(--foreground);line-height:1.8"><?php the_content(); ?></div>
        <?php endwhile; ?>
    </div>
</section>

<?php get_footer(); ?>

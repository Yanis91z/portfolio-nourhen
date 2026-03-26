<?php get_header(); ?>

<section style="padding: 3rem 0;">
    <div class="container container--narrow">
        <?php while (have_posts()) : the_post(); ?>
        <div class="animate-on-scroll">
            <a href="<?php echo esc_url(home_url('/#realisations')); ?>" class="back-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                Retour aux réalisations
            </a>

            <?php
            $image  = get_post_meta(get_the_ID(), 'image_url', true);
            $long   = get_post_meta(get_the_ID(), 'long_description', true);
            $tech   = get_post_meta(get_the_ID(), 'tech_stack', true);
            $demo   = get_post_meta(get_the_ID(), 'demo_url', true);
            $github = get_post_meta(get_the_ID(), 'github_url', true);
            $techs  = $tech ? array_map('trim', explode(',', $tech)) : [];
            ?>

            <?php if ($image) : ?>
                <div class="single-project__image">
                    <img src="<?php echo esc_url($image); ?>" alt="<?php the_title_attribute(); ?>">
                </div>
            <?php endif; ?>

            <h1 class="single-project__title"><?php the_title(); ?></h1>

            <?php if ($short) : ?>
                <p class="single-project__short"><?php echo esc_html($short); ?></p>
            <?php endif; ?>

            <?php if (!empty($techs)) : ?>
                <div class="tags single-project__tags">
                    <?php foreach ($techs as $t) : ?>
                        <span class="tag" style="padding: 0.375rem 1rem; font-size: 0.875rem;"><?php echo esc_html($t); ?></span>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>

            <div class="single-project__actions">
                <?php if ($github) : ?>
                    <a href="<?php echo esc_url(portfolio_ensure_url($github)); ?>" target="_blank" rel="noopener noreferrer" class="btn btn--outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg>
                        GitHub
                    </a>
                <?php endif; ?>
                <?php if ($demo) : ?>
                    <a href="<?php echo esc_url(portfolio_ensure_url($demo)); ?>" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                        Démo live
                    </a>
                <?php endif; ?>
            </div>

            <?php if ($long) : ?>
                <div class="single-project__content">
                    <?php echo wpautop(esc_html($long)); ?>
                </div>
            <?php endif; ?>
        </div>
        <?php endwhile; ?>
    </div>
</section>

<?php get_footer(); ?>

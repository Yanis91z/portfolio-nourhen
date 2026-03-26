<?php get_header(); ?>

<div class="mouse-blob" id="mouse-blob"></div>

<!-- ========== ACCUEIL ========== -->
<section id="accueil" class="hero section-anchor">
    <div class="container">
        <div class="hero__grid">
            <div class="animate-on-scroll" style="position:relative;z-index:1">
                <p class="hero__eyebrow">Bienvenue sur mon portfolio</p>

                <h1 class="hero__title">
                    <?php echo esc_html(get_theme_mod('about_name', 'Nourhen Ghlissi')); ?>
                    <br>
                    <span class="gradient-text"><?php echo esc_html(get_theme_mod('about_title', 'Marketing Digital')); ?></span>
                </h1>

                <p class="hero__description">
                    <?php echo esc_html(get_theme_mod('about_description', 'Étudiante en Marketing Digital, passionnée par la stratégie digitale et la création de contenu.')); ?>
                </p>

                <div class="hero__cta">
                    <a href="#realisations" class="btn btn--primary">
                        Mes réalisations
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </a>
                    <a href="#contact" class="btn btn--outline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        Me contacter
                    </a>
                </div>
            </div>

            <div class="hero__photo animate-on-scroll">
                <div class="blob-container">
                    <div class="blob-glow"></div>
                    <div class="blob-border"></div>
                    <div class="blob-image">
                        <?php $photo = get_theme_mod('about_photo', '');
                        if ($photo) : ?>
                            <img src="<?php echo esc_url($photo); ?>" alt="<?php echo esc_attr(get_theme_mod('about_name', 'Nourhen Ghlissi')); ?>">
                        <?php else : ?>
                            <div class="blob-placeholder">
                                <?php echo esc_html(mb_substr(get_theme_mod('about_name', 'N'), 0, 1)); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ========== STATS ========== -->
<section class="stats">
    <div class="container">
        <div class="stats__grid animate-on-scroll">
            <?php for ($i = 1; $i <= 4; $i++) :
                $value = get_theme_mod("stat_{$i}_value", '');
                $label = get_theme_mod("stat_{$i}_label", '');
                if ($value && $label) : ?>
                    <div class="stat-card">
                        <p class="stat-card__value gradient-text"><?php echo esc_html($value); ?></p>
                        <p class="stat-card__label"><?php echo esc_html($label); ?></p>
                    </div>
                <?php endif;
            endfor; ?>
        </div>
    </div>
</section>

<!-- ========== RÉALISATIONS ========== -->
<section id="realisations" class="section-anchor" style="padding: 4rem 0; position: relative;">
    <div class="bg-blobs">
        <div class="bg-blob bg-blob--top"></div>
        <div class="bg-blob bg-blob--bottom"></div>
        <div class="bg-shape bg-shape--top"></div>
        <div class="bg-shape bg-shape--bottom"></div>
        <div class="bg-dot bg-dot--1"></div>
        <div class="bg-dot bg-dot--2"></div>
        <div class="bg-dot bg-dot--3"></div>
    </div>

    <div class="container" style="position:relative;z-index:1;">
        <div class="page-header animate-on-scroll">
            <h2>Mes <span class="gradient-text">Réalisations</span></h2>
            <p>Découvrez mes réalisations en communication et marketing, de la stratégie à la création.</p>
        </div>

        <?php
        $projects = new WP_Query([
            'post_type'      => 'realisation',
            'posts_per_page' => -1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);
        ?>

        <?php if ($projects->have_posts()) : ?>
            <div class="projects-grid">
                <?php $idx = 0; while ($projects->have_posts()) : $projects->the_post();
                    $image  = get_post_meta(get_the_ID(), 'image_url', true);
                    $short  = get_post_meta(get_the_ID(), 'short_description', true);
                    $tech   = get_post_meta(get_the_ID(), 'tech_stack', true);
                    $demo   = get_post_meta(get_the_ID(), 'demo_url', true);
                    $github = get_post_meta(get_the_ID(), 'github_url', true);
                    $techs  = $tech ? array_map('trim', explode(',', $tech)) : [];
                ?>
                    <div class="animate-on-scroll" style="transition-delay: <?php echo $idx * 100; ?>ms">
                        <div class="project-card" style="cursor:pointer" onclick="window.location.href='<?php echo esc_url(home_url('/?view_realisation=' . get_the_ID())); ?>'">
                            <div class="project-card__image">
                                <?php if ($image) : ?>
                                    <img src="<?php echo esc_url($image); ?>" alt="<?php the_title_attribute(); ?>">
                                <?php else : ?>
                                    <div class="project-card__placeholder">
                                        <?php echo esc_html(mb_substr(get_the_title(), 0, 1)); ?>
                                    </div>
                                <?php endif; ?>
                            </div>
                            <div class="project-card__body">
                                <h3 class="project-card__title"><?php the_title(); ?></h3>
                                <?php if ($short) : ?>
                                    <p class="project-card__excerpt"><?php echo esc_html($short); ?></p>
                                <?php endif; ?>
                                <?php if (!empty($techs)) : ?>
                                    <div class="tags">
                                        <?php foreach (array_slice($techs, 0, 4) as $t) : ?>
                                            <span class="tag"><?php echo esc_html($t); ?></span>
                                        <?php endforeach; ?>
                                    </div>
                                <?php endif; ?>
                                <div class="project-card__links">
                                    <?php if ($github) : ?>
                                        <a href="<?php echo esc_url(portfolio_ensure_url($github)); ?>" target="_blank" rel="noopener noreferrer" title="GitHub" onclick="event.stopPropagation();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/></svg></a>
                                    <?php endif; ?>
                                    <?php if ($demo) : ?>
                                        <a href="<?php echo esc_url(portfolio_ensure_url($demo)); ?>" target="_blank" rel="noopener noreferrer" title="Démo" onclick="event.stopPropagation();"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg></a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php $idx++; endwhile; wp_reset_postdata(); ?>
            </div>
        <?php else : ?>
            <p class="empty-state">Aucune réalisation pour le moment.</p>
        <?php endif; ?>
    </div>
</section>

<!-- ========== COMPÉTENCES ========== -->
<section id="competences" class="section-anchor" style="padding: 4rem 0; position: relative;">
    <div class="container container--narrow" style="position:relative;z-index:1;">
        <div class="page-header animate-on-scroll">
            <h2>Mes <span class="gradient-text">Compétences</span></h2>
            <p>Les outils et savoir-faire que je maîtrise en communication et marketing.</p>
        </div>

        <?php
        $skills = new WP_Query([
            'post_type'      => 'competence',
            'posts_per_page' => -1,
            'orderby'        => 'menu_order',
            'order'          => 'ASC',
        ]);
        ?>

        <?php if ($skills->have_posts()) : ?>
            <div class="skills-list">
                <?php $idx = 0; while ($skills->have_posts()) : $skills->the_post();
                    $level = intval(get_post_meta(get_the_ID(), 'skill_level', true));
                ?>
                    <div class="skill-row animate-slide-left" style="transition-delay: <?php echo $idx * 80; ?>ms" data-skill-level="<?php echo esc_attr($level); ?>">
                        <div class="skill-row__header">
                            <span class="skill-row__name"><?php the_title(); ?></span>
                            <span class="skill-row__level"><?php echo esc_html($level); ?>%</span>
                        </div>
                        <div class="skill-row__track">
                            <div class="skill-row__fill"></div>
                        </div>
                    </div>
                <?php $idx++; endwhile; wp_reset_postdata(); ?>
            </div>
        <?php else : ?>
            <p class="empty-state">Aucune compétence ajoutée pour le moment.</p>
        <?php endif; ?>
    </div>
</section>

<!-- ========== VIDÉOS ========== -->
<section id="videos" class="section-anchor" style="padding: 4rem 0; position: relative;">
    <div class="container" style="position:relative;z-index:1;">
        <div class="page-header animate-on-scroll">
            <h2>Mes <span class="gradient-text">Vidéos</span></h2>
            <p>Mes créations vidéo et contenus.</p>
        </div>

        <?php
        $videos = new WP_Query([
            'post_type'      => 'video',
            'posts_per_page' => -1,
            'orderby'        => 'date',
            'order'          => 'DESC',
        ]);
        ?>

        <?php if ($videos->have_posts()) : ?>
            <div class="videos-grid">
                <?php $idx = 0; while ($videos->have_posts()) : $videos->the_post();
                    $video_url  = get_post_meta(get_the_ID(), 'video_url', true);
                    $video_desc = get_post_meta(get_the_ID(), 'video_description', true);
                ?>
                    <div class="animate-on-scroll" style="transition-delay: <?php echo $idx * 100; ?>ms; width:100%; display:flex; justify-content:center;">
                        <div class="video-card" data-video-id="video-<?php echo get_the_ID(); ?>">
                            <?php if ($video_url) : ?>
                                <video id="video-<?php echo get_the_ID(); ?>" src="<?php echo esc_url($video_url); ?>" loop muted playsinline></video>
                            <?php endif; ?>
                            <div class="video-card__overlay">
                                <h3><?php the_title(); ?></h3>
                                <?php if ($video_desc) : ?>
                                    <p><?php echo esc_html($video_desc); ?></p>
                                <?php endif; ?>
                            </div>
                            <div class="video-card__controls">
                                <button class="video-btn video-play-btn" data-target="video-<?php echo get_the_ID(); ?>">
                                    <svg class="icon-play" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                                    <svg class="icon-pause" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><rect x="14" y="4" width="4" height="16" rx="1"/><rect x="6" y="4" width="4" height="16" rx="1"/></svg>
                                </button>
                                <button class="video-btn video-mute-btn" data-target="video-<?php echo get_the_ID(); ?>">
                                    <svg class="icon-muted" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>
                                    <svg class="icon-unmuted" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                <?php $idx++; endwhile; wp_reset_postdata(); ?>
            </div>
        <?php else : ?>
            <p class="empty-state">Aucune vidéo pour le moment.</p>
        <?php endif; ?>
    </div>
</section>

<!-- ========== CONTACT ========== -->
<section id="contact" class="section-anchor" style="padding: 4rem 0;">
    <div class="container container--xs">
        <div class="page-header animate-on-scroll">
            <h2>Me <span class="gradient-text">Contacter</span></h2>
            <p>Une question, une collaboration ou un projet ? N'hésitez pas à me contacter.</p>
        </div>

        <form id="contact-form" class="contact-form animate-on-scroll" style="transition-delay: 200ms">
            <div class="form-group">
                <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Nom
                </label>
                <input type="text" name="name" class="form-input" placeholder="Votre nom" required>
                <p class="form-error" data-error="name"></p>
            </div>
            <div class="form-group">
                <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    Email
                </label>
                <input type="email" name="email" class="form-input" placeholder="votre@email.com" required>
                <p class="form-error" data-error="email"></p>
            </div>
            <div class="form-group">
                <label>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
                    Message
                </label>
                <textarea name="message" class="form-textarea" rows="6" placeholder="Votre message..." required></textarea>
                <p class="form-error" data-error="message"></p>
            </div>
            <button type="submit" class="btn btn--primary btn--full" id="contact-submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                Envoyer
            </button>
            <div id="contact-alert" style="display:none"></div>
        </form>
    </div>
</section>

<?php get_footer(); ?>

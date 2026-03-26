<?php

if (!defined('ABSPATH')) exit;

/* ========================================
   THEME SETUP
   ======================================== */

function portfolio_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list', 'gallery', 'caption']);

    register_nav_menus([
        'primary' => __('Menu Principal', 'portfolio-nourhen'),
    ]);
}
add_action('after_setup_theme', 'portfolio_setup');

/* ========================================
   ENQUEUE STYLES & SCRIPTS
   ======================================== */

function portfolio_scripts() {
    wp_enqueue_style('portfolio-style', get_stylesheet_uri(), [], '1.0.0');
    wp_enqueue_script('portfolio-theme', get_template_directory_uri() . '/js/theme.js', [], '1.0.0', true);

    wp_localize_script('portfolio-theme', 'portfolioAjax', [
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce'   => wp_create_nonce('portfolio_contact_nonce'),
    ]);
}
add_action('wp_enqueue_scripts', 'portfolio_scripts');

function portfolio_customizer_preview() {
    wp_enqueue_script('portfolio-customizer', get_template_directory_uri() . '/js/customizer-preview.js', ['customize-preview'], '1.0.0', true);
}
add_action('customize_preview_init', 'portfolio_customizer_preview');

/* ========================================
   CUSTOM POST TYPES
   ======================================== */

function portfolio_register_cpt() {
    register_post_type('realisation', [
        'labels' => [
            'name'               => 'Réalisations',
            'singular_name'      => 'Réalisation',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter une réalisation',
            'edit_item'          => 'Modifier la réalisation',
            'new_item'           => 'Nouvelle réalisation',
            'view_item'          => 'Voir la réalisation',
            'search_items'       => 'Rechercher',
            'not_found'          => 'Aucune réalisation trouvée',
        ],
        'public'       => true,
        'has_archive'  => true,
        'rewrite'      => ['slug' => 'realisations'],
        'supports'     => ['title'],
        'menu_icon'    => 'dashicons-portfolio',
        'show_in_rest' => true,
    ]);

    register_post_type('competence', [
        'labels' => [
            'name'               => 'Compétences',
            'singular_name'      => 'Compétence',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter une compétence',
            'edit_item'          => 'Modifier la compétence',
            'not_found'          => 'Aucune compétence trouvée',
        ],
        'public'       => true,
        'has_archive'  => false,
        'rewrite'      => ['slug' => 'competence'],
        'supports'     => ['title'],
        'menu_icon'    => 'dashicons-chart-bar',
        'show_in_rest' => true,
    ]);

    register_post_type('video', [
        'labels' => [
            'name'               => 'Vidéos',
            'singular_name'      => 'Vidéo',
            'add_new'            => 'Ajouter',
            'add_new_item'       => 'Ajouter une vidéo',
            'edit_item'          => 'Modifier la vidéo',
            'not_found'          => 'Aucune vidéo trouvée',
        ],
        'public'       => true,
        'has_archive'  => false,
        'rewrite'      => ['slug' => 'video'],
        'supports'     => ['title'],
        'menu_icon'    => 'dashicons-video-alt3',
        'show_in_rest' => true,
    ]);
}
add_action('init', 'portfolio_register_cpt');

/* ========================================
   CUSTOM META FIELDS
   ======================================== */

function portfolio_register_meta() {
    $realisation_fields = ['short_description', 'long_description', 'image_url', 'tech_stack', 'demo_url', 'github_url'];
    foreach ($realisation_fields as $f) {
        register_post_meta('realisation', $f, ['show_in_rest' => true, 'single' => true, 'type' => 'string']);
    }

    register_post_meta('competence', 'skill_level', ['show_in_rest' => true, 'single' => true, 'type' => 'integer']);

    $video_fields = ['video_description', 'video_url'];
    foreach ($video_fields as $f) {
        register_post_meta('video', $f, ['show_in_rest' => true, 'single' => true, 'type' => 'string']);
    }
}
add_action('init', 'portfolio_register_meta');

/* ========================================
   ADMIN: ENQUEUE MEDIA UPLOADER
   ======================================== */

function portfolio_admin_scripts($hook) {
    if ($hook !== 'post.php' && $hook !== 'post-new.php') return;
    wp_enqueue_media();
}
add_action('admin_enqueue_scripts', 'portfolio_admin_scripts');

/* ========================================
   META BOXES
   ======================================== */

function portfolio_add_meta_boxes() {
    add_meta_box('realisation_fields', 'Détails de la réalisation', 'portfolio_realisation_meta_box', 'realisation', 'normal', 'high');
    add_meta_box('competence_fields', 'Détails de la compétence', 'portfolio_competence_meta_box', 'competence', 'normal', 'high');
    add_meta_box('video_fields', 'Détails de la vidéo', 'portfolio_video_meta_box', 'video', 'normal', 'high');
}
add_action('add_meta_boxes', 'portfolio_add_meta_boxes');

function portfolio_realisation_meta_box($post) {
    wp_nonce_field('portfolio_save_meta', 'portfolio_meta_nonce');
    $short     = get_post_meta($post->ID, 'short_description', true);
    $long      = get_post_meta($post->ID, 'long_description', true);
    $image     = get_post_meta($post->ID, 'image_url', true);
    $tech      = get_post_meta($post->ID, 'tech_stack', true);
    $demo      = get_post_meta($post->ID, 'demo_url', true);
    $github    = get_post_meta($post->ID, 'github_url', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="pf_image">Image</label></th>
            <td>
                <div id="pf-image-preview" style="margin-bottom:10px">
                    <?php if ($image) : ?>
                        <img src="<?php echo esc_url($image); ?>" style="max-width:300px;max-height:200px;border-radius:8px">
                    <?php endif; ?>
                </div>
                <input type="hidden" name="image_url" id="pf_image" value="<?php echo esc_attr($image); ?>">
                <button type="button" class="button" id="pf-upload-image">Choisir une image</button>
                <?php if ($image) : ?>
                    <button type="button" class="button" id="pf-remove-image" style="color:#a00">Supprimer</button>
                <?php else : ?>
                    <button type="button" class="button" id="pf-remove-image" style="color:#a00;display:none">Supprimer</button>
                <?php endif; ?>
                <script>
                document.getElementById('pf-upload-image').addEventListener('click', function(e) {
                    e.preventDefault();
                    var frame = wp.media({ title: 'Choisir une image', multiple: false, library: { type: 'image' } });
                    frame.on('select', function() {
                        var url = frame.state().get('selection').first().toJSON().url;
                        document.getElementById('pf_image').value = url;
                        document.getElementById('pf-image-preview').innerHTML = '<img src="' + url + '" style="max-width:300px;max-height:200px;border-radius:8px">';
                        document.getElementById('pf-remove-image').style.display = '';
                    });
                    frame.open();
                });
                document.getElementById('pf-remove-image').addEventListener('click', function(e) {
                    e.preventDefault();
                    document.getElementById('pf_image').value = '';
                    document.getElementById('pf-image-preview').innerHTML = '';
                    this.style.display = 'none';
                });
                </script>
            </td>
        </tr>
        <tr>
            <th><label for="pf_short">Description courte</label></th>
            <td><input type="text" name="short_description" id="pf_short" value="<?php echo esc_attr($short); ?>" class="large-text" placeholder="Résumé en une phrase"></td>
        </tr>
        <tr>
            <th><label for="pf_long">Description longue</label></th>
            <td><textarea name="long_description" id="pf_long" rows="6" class="large-text" placeholder="Description détaillée du projet..."><?php echo esc_textarea($long); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="pf_tech">Technologies</label></th>
            <td><input type="text" name="tech_stack" id="pf_tech" value="<?php echo esc_attr($tech); ?>" class="large-text" placeholder="Adobe Illustrator, Canva, Photoshop, Premiere Pro"></td>
        </tr>
        <tr>
            <th><label for="pf_demo">Lien Démo</label></th>
            <td><input type="url" name="demo_url" id="pf_demo" value="<?php echo esc_attr($demo); ?>" class="large-text" placeholder="https://example.com"></td>
        </tr>
        <tr>
            <th><label for="pf_github">Lien GitHub</label></th>
            <td><input type="url" name="github_url" id="pf_github" value="<?php echo esc_attr($github); ?>" class="large-text" placeholder="https://github.com/..."></td>
        </tr>
    </table>
    <?php
}

function portfolio_competence_meta_box($post) {
    wp_nonce_field('portfolio_save_meta', 'portfolio_meta_nonce');
    $level = get_post_meta($post->ID, 'skill_level', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="pf_level">Niveau (0-100)</label></th>
            <td>
                <input type="number" name="skill_level" id="pf_level" value="<?php echo esc_attr($level); ?>" min="0" max="100" style="width:100px">
                <span>%</span>
            </td>
        </tr>
    </table>
    <?php
}

function portfolio_video_meta_box($post) {
    wp_nonce_field('portfolio_save_meta', 'portfolio_meta_nonce');
    $desc = get_post_meta($post->ID, 'video_description', true);
    $url  = get_post_meta($post->ID, 'video_url', true);
    ?>
    <table class="form-table">
        <tr>
            <th><label for="pf_vdesc">Description</label></th>
            <td><textarea name="video_description" id="pf_vdesc" rows="3" class="large-text" placeholder="Description de la vidéo..."><?php echo esc_textarea($desc); ?></textarea></td>
        </tr>
        <tr>
            <th><label for="pf_vurl">Fichier vidéo</label></th>
            <td>
                <input type="url" name="video_url" id="pf_vurl" value="<?php echo esc_attr($url); ?>" class="large-text" placeholder="https://res.cloudinary.com/...">
                <p style="margin-top:5px">
                    <button type="button" class="button" id="pf-upload-video">Choisir un fichier vidéo</button>
                </p>
                <script>
                document.getElementById('pf-upload-video').addEventListener('click', function(e) {
                    e.preventDefault();
                    var frame = wp.media({ title: 'Choisir une vidéo', multiple: false, library: { type: 'video' } });
                    frame.on('select', function() {
                        var url = frame.state().get('selection').first().toJSON().url;
                        document.getElementById('pf_vurl').value = url;
                    });
                    frame.open();
                });
                </script>
            </td>
        </tr>
    </table>
    <?php
}

function portfolio_save_meta($post_id) {
    if (!isset($_POST['portfolio_meta_nonce']) || !wp_verify_nonce($_POST['portfolio_meta_nonce'], 'portfolio_save_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $text_fields = ['short_description', 'long_description', 'image_url', 'tech_stack', 'demo_url', 'github_url', 'video_url', 'video_description'];
    foreach ($text_fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
    if (isset($_POST['skill_level'])) {
        update_post_meta($post_id, 'skill_level', intval($_POST['skill_level']));
    }
}
add_action('save_post', 'portfolio_save_meta');

/* ========================================
   CUSTOMIZER
   ======================================== */

function portfolio_customize_register($wp_customize) {
    // --- Colors ---
    $wp_customize->add_section('portfolio_colors', [
        'title'    => 'Couleurs du thème',
        'priority' => 30,
    ]);

    $wp_customize->add_setting('color_primary', ['default' => '#6366f1', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color']);
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'color_primary', [
        'label'   => 'Couleur primaire',
        'section' => 'portfolio_colors',
    ]));

    $wp_customize->add_setting('color_secondary', ['default' => '#8b5cf6', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_hex_color']);
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'color_secondary', [
        'label'   => 'Couleur secondaire',
        'section' => 'portfolio_colors',
    ]));

    $wp_customize->add_setting('theme_mode', ['default' => 'dark', 'transport' => 'postMessage', 'sanitize_callback' => 'sanitize_text_field']);
    $wp_customize->add_control('theme_mode', [
        'label'   => 'Mode du thème',
        'section' => 'portfolio_colors',
        'type'    => 'select',
        'choices' => ['dark' => 'Sombre', 'light' => 'Clair'],
    ]);

    // --- About ---
    $wp_customize->add_section('portfolio_about', [
        'title'    => 'À propos (Accueil)',
        'priority' => 35,
    ]);

    $about_fields = [
        'about_name'        => ['label' => 'Nom', 'default' => 'Nourhen Ghlissi'],
        'about_title'       => ['label' => 'Titre / Métier', 'default' => 'Marketing Digital'],
        'about_description' => ['label' => 'Description', 'default' => 'Étudiante en Marketing Digital, passionnée par la stratégie digitale et la création de contenu.'],
    ];

    foreach ($about_fields as $id => $args) {
        $wp_customize->add_setting($id, ['default' => $args['default'], 'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_control($id, [
            'label'   => $args['label'],
            'section' => 'portfolio_about',
            'type'    => $id === 'about_description' ? 'textarea' : 'text',
        ]);
    }

    $wp_customize->add_setting('about_photo', ['default' => '', 'sanitize_callback' => 'esc_url_raw']);
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'about_photo', [
        'label'   => 'Photo de profil',
        'section' => 'portfolio_about',
    ]));

    // --- Stats ---
    $wp_customize->add_section('portfolio_stats', [
        'title'    => 'Statistiques (Accueil)',
        'priority' => 36,
    ]);

    $stats = [
        1 => ['value' => '10+', 'label' => 'Projets réalisés'],
        2 => ['value' => '15+', 'label' => 'Compétences'],
        3 => ['value' => 'L3',  'label' => 'Formations'],
        4 => ['value' => '100%', 'label' => 'Créativité'],
    ];

    foreach ($stats as $i => $defaults) {
        $wp_customize->add_setting("stat_{$i}_value", ['default' => $defaults['value'], 'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_control("stat_{$i}_value", [
            'label'   => "Stat {$i} — Valeur",
            'section' => 'portfolio_stats',
        ]);

        $wp_customize->add_setting("stat_{$i}_label", ['default' => $defaults['label'], 'sanitize_callback' => 'sanitize_text_field']);
        $wp_customize->add_control("stat_{$i}_label", [
            'label'   => "Stat {$i} — Libellé",
            'section' => 'portfolio_stats',
        ]);
    }
}
add_action('customize_register', 'portfolio_customize_register');

/* ========================================
   INLINE CUSTOMIZER CSS
   ======================================== */

function portfolio_customizer_css() {
    $primary   = get_theme_mod('color_primary', '#6366f1');
    $secondary = get_theme_mod('color_secondary', '#8b5cf6');
    ?>
    <style>
        :root {
            --color-primary: <?php echo esc_attr($primary); ?>;
            --color-secondary: <?php echo esc_attr($secondary); ?>;
        }
    </style>
    <?php
}
add_action('wp_head', 'portfolio_customizer_css', 100);

function portfolio_body_class($classes) {
    $mode = get_theme_mod('theme_mode', 'dark');
    if ($mode === 'light') {
        $classes[] = 'light';
    }
    return $classes;
}
add_filter('body_class', 'portfolio_body_class');

/* ========================================
   CONTACT FORM AJAX
   ======================================== */

function portfolio_handle_contact() {
    check_ajax_referer('portfolio_contact_nonce', 'nonce');

    $name    = sanitize_text_field($_POST['name'] ?? '');
    $email   = sanitize_email($_POST['email'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($message)) {
        wp_send_json_error('Tous les champs sont requis.');
    }

    $to      = get_option('admin_email');
    $subject = sprintf('[Portfolio] Message de %s', $name);
    $body    = sprintf("Nom: %s\nEmail: %s\n\nMessage:\n%s", $name, $email, $message);
    $headers = ['Content-Type: text/plain; charset=UTF-8', sprintf('Reply-To: %s <%s>', $name, $email)];

    $sent = wp_mail($to, $subject, $body, $headers);

    if ($sent) {
        wp_send_json_success('Message envoyé avec succès !');
    } else {
        wp_send_json_error('Erreur lors de l\'envoi.');
    }
}
add_action('wp_ajax_portfolio_contact', 'portfolio_handle_contact');
add_action('wp_ajax_nopriv_portfolio_contact', 'portfolio_handle_contact');

/* ========================================
   HELPERS
   ======================================== */

function portfolio_activate() {
    portfolio_register_cpt();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'portfolio_activate');

function portfolio_maybe_flush_rules() {
    if (get_option('portfolio_flush_needed', false)) {
        flush_rewrite_rules();
        delete_option('portfolio_flush_needed');
    }
}
add_action('init', 'portfolio_maybe_flush_rules', 99);

function portfolio_flag_flush() {
    if (!get_option('portfolio_flush_done_v1')) {
        update_option('portfolio_flush_needed', true);
        update_option('portfolio_flush_done_v1', true);
    }
}
add_action('init', 'portfolio_flag_flush', 1);

function portfolio_register_query_vars($vars) {
    $vars[] = 'view_realisation';
    return $vars;
}
add_filter('query_vars', 'portfolio_register_query_vars');

function portfolio_realisation_template($template) {
    $real_id = intval(get_query_var('view_realisation'));
    if ($real_id && get_post_type($real_id) === 'realisation') {
        global $wp_query, $post;
        $post = get_post($real_id);
        $wp_query->posts = [$post];
        $wp_query->post = $post;
        $wp_query->post_count = 1;
        $wp_query->found_posts = 1;
        $wp_query->is_single = true;
        $wp_query->is_singular = true;
        $wp_query->is_home = false;
        $wp_query->is_archive = false;
        $wp_query->is_404 = false;
        setup_postdata($post);
        $custom = locate_template('single-realisation.php');
        if ($custom) return $custom;
    }
    if (is_singular('realisation')) {
        $custom = locate_template('single-realisation.php');
        if ($custom) return $custom;
    }
    return $template;
}
add_filter('template_include', 'portfolio_realisation_template', 99);

function portfolio_ensure_url($url) {
    if (empty($url)) return '';
    if (!preg_match('/^https?:\/\//', $url)) {
        return 'https://' . $url;
    }
    return $url;
}

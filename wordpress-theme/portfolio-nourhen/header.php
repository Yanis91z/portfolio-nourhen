<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<nav class="navbar">
    <div class="navbar__inner">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="navbar__brand gradient-text">
            Portfolio
        </a>

        <ul class="navbar__links">
            <li><a href="#accueil" class="nav-anchor active">Accueil</a></li>
            <li><a href="#realisations" class="nav-anchor">Réalisations</a></li>
            <li><a href="#competences" class="nav-anchor">Compétences</a></li>
            <li><a href="#videos" class="nav-anchor">Vidéos</a></li>
            <li><a href="#contact" class="nav-anchor">Contact</a></li>
        </ul>

        <button class="navbar__burger" id="burger-toggle" aria-label="Menu">
            <svg id="burger-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg id="close-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="display:none">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </button>
    </div>

    <div class="navbar__mobile" id="mobile-menu">
        <div class="navbar__mobile-bg">
            <div class="navbar__mobile-gradient"></div>
            <div class="navbar__mobile-overlay"></div>
        </div>
        <ul class="navbar__mobile-links">
            <li><a href="#accueil" class="nav-anchor">Accueil</a></li>
            <li><a href="#realisations" class="nav-anchor">Réalisations</a></li>
            <li><a href="#competences" class="nav-anchor">Compétences</a></li>
            <li><a href="#videos" class="nav-anchor">Vidéos</a></li>
            <li><a href="#contact" class="nav-anchor">Contact</a></li>
        </ul>
    </div>
</nav>

<main class="site-main">

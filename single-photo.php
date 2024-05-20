<?php get_header(); ?>

<?php
$current_post_id = get_the_ID();
$current_category = get_the_terms($current_post_id, 'categorie');
$current_category_id = $current_category[0]->term_id;

$prev_post = get_previous_post();
$prev_post_id = $prev_post ? $prev_post->ID : '';

$next_post = get_next_post();
$next_post_id = $next_post ? $next_post->ID : '';
?>

<div class="single-photo-content">
    <div class="photo-details">
        <div class="photo-info">
            <h1><?php the_title(); ?></h1>
            <div class="main-content">
                <div class="info">
                    <p><strong>Catégorie :</strong> <?php echo get_the_term_list(get_the_ID(), 'categorie', '', ', ', ''); ?></p>
                    <p><strong>Référence :</strong> <?php echo get_post_meta(get_the_ID(), 'reference', true); ?></p>
                    <p><strong>Date :</strong> <?php echo get_the_date(); ?></p>
                    <p><strong>Format :</strong> <?php echo get_the_term_list(get_the_ID(), 'format', '', ', ', ''); ?></p>
                </div>
                <div class="photo-description">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
        <div class="photo-image">
            <?php the_post_thumbnail('large'); ?>
        </div>
    </div>

    <hr class="separator">

    <div class="photo-interest">
        <div class="contact-section">
            <p>Cette photo vous intéresse ?</p>
            <button id="bouton-contact-contenu" class="contact-button">Contact</button>
        </div>
        <div class="navigation-arrows">
            <?php if (!empty($prev_post_id)) : ?>
                <a href="<?php echo esc_url(get_permalink($prev_post_id)); ?>" class="arrow arrow-left">
                    <img src="<?= esc_url(get_stylesheet_directory_uri()) ?>/images/arrow-left.png" alt="fleche gauche">
                    <div class="thumbnail-preview thumbnail-left">
                        <?php echo get_the_post_thumbnail($prev_post_id, 'thumbnail'); ?>
                    </div>
                </a>
            <?php endif; ?>
            <?php if (!empty($next_post_id)) : ?>
                <a href="<?php echo esc_url(get_permalink($next_post_id)); ?>" class="arrow arrow-right">
                    <img src="<?= esc_url(get_stylesheet_directory_uri()) ?>/images/arrow-right.png" alt="fleche droite">
                    <div class="thumbnail-preview thumbnail-right">
                        <?php echo get_the_post_thumbnail($next_post_id, 'thumbnail'); ?>
                    </div>
                </a>
            <?php endif; ?>
        </div>
    </div>

    <hr class="separator">

    <h2>Vous aimerez aussi</h2>
    <div class="wrapper">
        <div class="photo-grid" id="photo-grid">
            <?php 
            $similar_photos_args = array(
                'post_type' => 'photo',
                'posts_per_page' => 2,
                'post__not_in' => array($current_post_id),
                'tax_query' => array(
                    array(
                        'taxonomy' => 'categorie',
                        'field' => 'term_id',
                        'terms' => $current_category_id
                    )
                )
            );
            $similar_photos = new WP_Query($similar_photos_args);

            if ($similar_photos->have_posts()) :
                while ($similar_photos->have_posts()) : $similar_photos->the_post();
                    $permalink = get_permalink();
                    $categories = get_the_category();
            ?>
                    <div class="col">
                        <div class="image-container">
                            <div class="lightbox" style="display: none;">
                                <?php the_content(); ?> 
                            </div>
                            <a href="<?php echo esc_url($permalink); ?>" class="btn-details">
                                <img src="<?= esc_url(get_stylesheet_directory_uri()) ?>/images/eye.png" alt="Détails de la photo">
                            </a>
                            <a href="" class="photo-link">
                                <img src="<?= esc_url(get_stylesheet_directory_uri()) ?>/images/fullscreen.png" alt="Afficher la photo en plein écran">
                            </a>
                            <?php the_post_thumbnail('thumbnail'); ?>
                            <h3><?php the_title(); ?></h3>
                            <?php the_content(); ?>
                            <div class="photo-category">
                                <?php
                                $categories = get_the_terms(get_the_ID(), 'categorie');
                                if ($categories && !is_wp_error($categories)) {
                                    echo esc_html($categories[0]->name);
                                } else {
                                    echo 'Catégorie non définie';
                                }
                                ?>
                            </div>
                        </div>
                    </div>
            <?php
                endwhile;
            endif;
            wp_reset_postdata();
            ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>


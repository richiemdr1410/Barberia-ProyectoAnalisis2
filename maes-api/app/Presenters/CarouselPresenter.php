<?php

namespace App\Presenters;

use App\Transformers\CarouselTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class CarouselPresenter.
 *
 * @package namespace App\Presenters;
 */
class CarouselPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new CarouselTransformer();
    }
}

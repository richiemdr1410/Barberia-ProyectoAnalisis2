<?php

namespace App\Presenters;

use App\Transformers\BarberTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class BarberPresenter.
 *
 * @package namespace App\Presenters;
 */
class BarberPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new BarberTransformer();
    }
}

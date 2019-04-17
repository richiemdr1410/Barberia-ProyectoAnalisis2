<?php

namespace App\Presenters;

use App\Transformers\ScheduleByBarberTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class ScheduleByBarberPresenter.
 *
 * @package namespace App\Presenters;
 */
class ScheduleByBarberPresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new ScheduleByBarberTransformer();
    }
}

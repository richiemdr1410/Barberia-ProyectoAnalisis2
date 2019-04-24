<?php

namespace App\Presenters;

use App\Transformers\UploadImageTransformer;
use Prettus\Repository\Presenter\FractalPresenter;

/**
 * Class UploadImagePresenter.
 *
 * @package namespace App\Presenters;
 */
class UploadImagePresenter extends FractalPresenter
{
    /**
     * Transformer
     *
     * @return \League\Fractal\TransformerAbstract
     */
    public function getTransformer()
    {
        return new UploadImageTransformer();
    }
}

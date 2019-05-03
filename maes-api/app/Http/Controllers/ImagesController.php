<?php

namespace App\Http\Controllers;

use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;

class ImagesController extends Controller {

    public function picture($type, $name)
    {
        $storagePath = resource_path('/images/'  . $type . '/'.$name );

        return Image::make($storagePath)->response();
    }
}

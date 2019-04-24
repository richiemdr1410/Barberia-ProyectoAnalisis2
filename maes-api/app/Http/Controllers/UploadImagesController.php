<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\UploadImageCreateRequest;
use App\Http\Requests\UploadImageUpdateRequest;
use App\Repositories\UploadImageRepository;
use App\Validators\UploadImageValidator;

/**
 * Class UploadImagesController.
 *
 * @package namespace App\Http\Controllers;
 */
class UploadImagesController extends Controller
{
    /**
     * @var UploadImageRepository
     */
    protected $repository;

    /**
     * @var UploadImageValidator
     */
    protected $validator;

    /**
     * UploadImagesController constructor.
     *
     * @param UploadImageRepository $repository
     * @param UploadImageValidator $validator
     */
    public function __construct(UploadImageRepository $repository, UploadImageValidator $validator)
    {
        $this->repository = $repository;
        $this->validator  = $validator;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $uploadImages = $this->repository->all();

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $uploadImages,
            ]);
        }

        return view('uploadImages.index', compact('uploadImages'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  UploadImageCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function store(UploadImageCreateRequest $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $uploadImage = $this->repository->create($request->all());

            $response = [
                'message' => 'UploadImage created.',
                'data'    => $uploadImage->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {
            if ($request->wantsJson()) {
                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $uploadImage = $this->repository->find($id);

        if (request()->wantsJson()) {

            return response()->json([
                'data' => $uploadImage,
            ]);
        }

        return view('uploadImages.show', compact('uploadImage'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $uploadImage = $this->repository->find($id);

        return view('uploadImages.edit', compact('uploadImage'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UploadImageUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     *
     * @throws \Prettus\Validator\Exceptions\ValidatorException
     */
    public function update(UploadImageUpdateRequest $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $uploadImage = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'UploadImage updated.',
                'data'    => $uploadImage->toArray(),
            ];

            if ($request->wantsJson()) {

                return response()->json($response);
            }

            return redirect()->back()->with('message', $response['message']);
        } catch (ValidatorException $e) {

            if ($request->wantsJson()) {

                return response()->json([
                    'error'   => true,
                    'message' => $e->getMessageBag()
                ]);
            }

            return redirect()->back()->withErrors($e->getMessageBag())->withInput();
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $deleted = $this->repository->delete($id);

        if (request()->wantsJson()) {

            return response()->json([
                'message' => 'UploadImage deleted.',
                'deleted' => $deleted,
            ]);
        }

        return redirect()->back()->with('message', 'UploadImage deleted.');
    }

    public function saveFile(Request $request)
    {
        $file = $request->file('image');
        $type = $request->input('type');
        $real_name = $file->getClientOriginalName();
        $location = \Config::get('values.location');
        $destination_path = $location.'Barberia-ProyectoAnalisis2/maes-client/src/assets/images/'.$type;

        $file->move($destination_path,  $real_name);
        return response()->json('File Save');

    }
}

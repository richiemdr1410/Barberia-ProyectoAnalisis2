<?php

namespace App\Http\Controllers;

use App\Criteria\CarouselCriteria;
use Illuminate\Http\Request;

use App\Http\Requests;
use Prettus\Validator\Contracts\ValidatorInterface;
use Prettus\Validator\Exceptions\ValidatorException;
use App\Http\Requests\CarouselCreateRequest;
use App\Http\Requests\CarouselUpdateRequest;
use App\Repositories\CarouselRepository;
use App\Validators\CarouselValidator;

/**
 * Class CarouselsController.
 *
 * @package namespace App\Http\Controllers;
 */
class CarouselsController extends Controller
{
    /**
     * @var CarouselRepository
     */
    protected $repository;

    /**
     * @var CarouselValidator
     */
    protected $validator;

    /**
     * CarouselsController constructor.
     *
     * @param CarouselRepository $repository
     * @param CarouselValidator $validator
     */
    public function __construct(CarouselRepository $repository, CarouselValidator $validator)
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
        $carousels = $this->repository->all();

        return response()->json([
            'data' => $carousels,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\Response
     *
     */
    public function store(Request $request)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_CREATE);

            $carousel = $this->repository->create($request->all());

            $response = [
                'message' => 'Carousel created.',
                'data'    => $carousel->toArray(),
            ];

            return response()->json($response);
        } catch (ValidatorException $e) {
            return response()->json([
                'error'   => true,
                'message' => $e->getMessageBag()
            ]);
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
        $carousel = $this->repository->find($id);

        return response()->json([
            'data' => $carousel,
        ]);
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
        $carousel = $this->repository->find($id);

        return view('carousels.edit', compact('carousel'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  string $id
     *
     * @return Response
     *
     */
    public function update(Request $request, $id)
    {
        try {

            $this->validator->with($request->all())->passesOrFail(ValidatorInterface::RULE_UPDATE);

            $carousel = $this->repository->update($request->all(), $id);

            $response = [
                'message' => 'Carousel updated.',
                'data'    => $carousel->toArray(),
            ];

            return response()->json($response);
        } catch (ValidatorException $e) {

            return response()->json([
                'error'   => true,
                'message' => $e->getMessageBag()
            ]);
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

        return response()->json([
            'message' => 'Carousel deleted.',
            'deleted' => $deleted,
        ]);
    }

    public function getCarousel()
    {
        $this->repository->pushCriteria(app('Prettus\Repository\Criteria\RequestCriteria'));
        $this->repository->pushCriteria(CarouselCriteria::class);
        $carousels = $this->repository->all();

        return response()->json([
            'data' => $carousels,
        ]);
    }
}

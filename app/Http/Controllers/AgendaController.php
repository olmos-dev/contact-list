<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UsuarioRequest;

class AgendaController extends Controller
{
    /**
     * Muestra el listado de los contactos
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //verifica que sea un petición ajax
        if($request->ajax()){
            //obtiene todos los usuarios y muestra 10 resultados por página
            $usuarios = User::select('id','name','phone','email')->paginate(10);
            //se prepara la respuesta en formato json y se envia el codigo de estado 200
            return response()->json($usuarios,200);
        }
        return abort(404);
    }

    /**
     * Guarda un nuevo usuario en la BD
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UsuarioRequest $request)
    {
        //verifica que se una petición ajax
        if($request->ajax()){

            //validación de los campos del formulario al crear un nuevo contacto
            $validado = $request->validated();
            
            //se almacena los datos correctos en la BD
            $usuario = User::create([
                'name' => $validado['nombre'],
                'phone' => $validado['telefono'],
                'email' => $validado['correo'],
                'password' => Hash::make('123')
            ]);

            //se prepara la respuesta en formato json para que sea mostrada en el frontend
            return response()->json([
                'id' => $usuario->id,
                'name' => $usuario->name,
                'phone' => $usuario->phone,
                'email' => $usuario->email
            ],200);
        }

        return abort(404);
       
    }

    /**
     * Muestra un contacto en específico
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        //verifica que sea una petición ajax
        if($request->ajax()){

            //busca el usuario por id en la BD
            $usuario = User::findOrFail($id);

            //si el usuario existe en la BD, se prepara la respuesta en formato json
            return response()->json([
                "id" => $usuario->id,
                "nombre" => $usuario->name,
                "telefono" => $usuario->phone,
                "correo" => $usuario->email,
            ],200);

        }
        
        return abort(404);
    }

    /**
     * Actualiza la infomación de un contacto
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UsuarioRequest $request, $id)
    {
        //verifica que sea una petición ajax
        if($request->ajax()){
            
            //verifica que el usuario exista en el BD
            $usuario = User::findOrfail($id);

            //validacion de los campos del formulario al editar un contacto
            $validado = $request->validated();

            //si es correcto, se almacenan los nuevos valores en la BD
            $usuario->update([
                'name' => $validado['nombre'],
                'phone' => $validado['telefono'],
                'email' => $validado['correo']
            ]);
            
            //se envia la respuesta en formato json de la informacion del contacto
            return response()->json([$usuario],200);
        }
        
        return abort(404);
    }

    /**
     * Elimina un contacto
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        //verifica que sea una petición ajax
        if($request->ajax()){
            
            //verifica si existe el usuario
            $usuario = User::findOrFail($id);

            //se encuentra el usuario y lo elimina
            $usuario->delete();

            //se retorna una respuesta del servidor con el codigo de estado 200 (la operación se realizo exitosamente)
            return response()->json($usuario,200);
        }

        return abort(404);
    }

    /**Método de buscar a un contacto por nombre*/
    public function search(Request $request, $busqueda){

        //verifica que sea una petición ajax
        if($request->ajax()){
            //se utiliza un scope y se le pasa el parametro (nombre) a buscar y se muestran 10 resultados por página
            $resultados = User::buscar($busqueda)->paginate(10);

            //se retorna como respuesta los contactos que coincidan con el nombre que el usuario busca
            return response()->json($resultados);
        }

        return abort(404);

    }
    
    /**Paginación*/
    public function paginate()
    {
        //re realiza la paginación de los usuarios y muestra 10 resultados por página
        $usuarios = User::select('id','name','phone','email')->paginate(10);
        
        //se retorna como respuesta los contactos al cliente
        return response()->json($usuarios,200);

    }



    
}

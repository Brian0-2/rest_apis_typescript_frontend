import { ActionFunctionArgs, Form, useNavigate , redirect, useFetcher} from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from "../services/ProductService"
import { FormEvent } from "react"

type ProductsDetailsProps = {
    product : Product
}

export async function action({params}: ActionFunctionArgs){
    if(params.id !== undefined){
        await deleteProduct(parseInt(params.id))
    }
    return redirect('/')
}

export default function ProductsDetails({product} : ProductsDetailsProps) {

    //Fetcher se utiliza para para trabajar en la misma sin navegar a otra
    const fetcher = useFetcher();
    //Navigate se utiliza para navegar en diferentes paginas
    const navigate = useNavigate();

    const isAvailable = product.availability

    function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(!confirm('¿Eliminar?')){
            e.preventDefault()

        }
    }

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
            {product.id}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
            {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
            <fetcher.Form method="POST">
                <button
                    type="submit"
                    name="id"
                    value={product.id}
                    className={`${isAvailable ?'text-black' : 'text-red-600'} rounded-lg p-2 text-sm uppercase font-bold w-full border border-black-100 cursor-pointer`}
                >
                    {isAvailable ? 'Available' : 'Not Available'}
                </button>
            </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
            <div className="flex gap-2 justify-center">
                <button 
                    onClick={() => navigate(`/products/${product.id}/edit`)}
                    className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                >
                    Edit
                </button>

                <Form
                    className="w-full"
                    method="POST"
                    action={`products/${product.id}/delete`}
                    onSubmit={handleSubmit}
                >
                    <input 
                        type="submit" 
                        value='Delete'
                        className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
                    />
                </Form>
            </div>
        </td>
    </tr> 
  )
}

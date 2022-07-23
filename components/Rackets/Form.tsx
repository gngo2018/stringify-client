import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form'
import { CreateRacketAsync, GetStaticRacketBrands } from '../../services/RacketService'
import formStyles from './form.module.css'

export interface RacketFormProps {
    brand: string,
    model: string,
    year: number
}

export default function RacketForm() {
    const router = useRouter();
    const { register, handleSubmit } = useForm<RacketFormProps>();
    const racketBrands = GetStaticRacketBrands();
    const onSubmit = handleSubmit(async (data) => {
        const response = await CreateRacketAsync(data);
        if(response.status === 200){
            router.push('/Rackets');
        }
    });
    
    return (
        <form className={formStyles.form} onSubmit={onSubmit}>
            <select {...register('brand')}>
                <option value=''>Brand</option>
                {racketBrands && (
                    racketBrands.map((b) =>{
                        return (
                            <option key={b.id} value={b.name}>{b.name}</option>
                        )
                    })
                )}
            </select>
            <input
                {...register('model')}
                placeholder='Model'
                required
            />
            <input
                {...register('year')}
                placeholder='Year'
                type='number'
                required
            />
            <button>Submit</button>
        </form>
    )
}
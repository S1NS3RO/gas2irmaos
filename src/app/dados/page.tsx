import FormDados from '@/components/Forms/FormDados'

import Image from 'next/image'

//styles
import '@/styles/forms.scss'

export default function Dados() {
  return (
    <><Image
        className='img-bg'
        src='/banner.jpg'
        alt={'imagem'}
        width={938}
        height={392}
        unoptimized
      />
      <FormDados />
      <Image
        className='img-bg'
        src='/fb-bg.jpg'
        alt={'imagem'}
        width={1080}
        height={1080}
        unoptimized
      />
    </>
  )
}

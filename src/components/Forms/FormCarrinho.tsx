'use client'

//next
import Image from 'next/image'

//React
import React, { useEffect } from 'react'

//hooks
import { useAppState } from '@/contexts/dadosCompra'

//Fonts
import { SourceSans3 } from '@/fonts/fonts'

//icons
import { BsDashLg, BsPlusLg } from 'react-icons/bs'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaWeightHanging } from 'react-icons/fa'

//Components
import LinkButton from '@/components/Utils/LinkButton'
import ResumoCompra from '@/components/Utils/ResumoCompra'

//data
import { products } from './produtos'

export default function FormCarrinho() {
  const {
    valorTotal,
    setValorTotal,
    quantidade,
    setQuantidade,
    selectedProducts
  } = useAppState()

  const decrementQuantidade = (id: number) => {
    if (quantidade[id] > 0) {
      setQuantidade(prevQuantidade => ({
        ...prevQuantidade,
        [id]: prevQuantidade[id] - 1
      }))
    }
  }

  const incrementarQuantidade = (id: number) => {
    setQuantidade(prevQuantidade => ({
      ...prevQuantidade,
      [id]: (prevQuantidade[id] || 0) + 1
    }))
  }

  useEffect(() => {
    let newTotal = 0
    for (const id in quantidade) {
      if (quantidade.hasOwnProperty(id)) {
        newTotal +=
          quantidade[id] *
          (products.find(item => item.id === parseInt(id))?.price || 0)
      }
    }
    setValorTotal(newTotal)
  }, [quantidade, setValorTotal])
  return (
    <>
      <div className='products'>
        {products.map(produto => (
          <div
            key={produto.id}
            className='product__card'>
            <div style={{ textAlign: 'center' }}>
              <h2>{produto.name.toUpperCase()}</h2>
              <p style={{ fontSize: '.8rem' }}>{produto.description}</p>
            </div>

            <Image
              src={produto.image}
              alt={produto.name}
              width={500}
              height={500}
            />

            <span className='weight'>{produto.weight}</span>

            <div className='product__card--quantidade'>
              <BsDashLg onClick={() => decrementQuantidade(produto.id)} />
              {quantidade[produto.id] || 0}
              <BsPlusLg onClick={() => incrementarQuantidade(produto.id)} />
            </div>

            <div className='price'>
              <span className={SourceSans3.className}>
                {quantidade[produto.id] > 0
                  ? (
                      produto.price * (quantidade[produto.id] || 1)
                    ).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })
                  : produto.price.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
              </span>
            </div>
          </div>
        ))}
      </div>

      <ResumoCompra />

      {valorTotal === 0 ? (
        <button
          className='button'
          disabled>
          <AiOutlineShoppingCart /> Avançar
        </button>
      ) : (
        <LinkButton
          to={'/dados'}
          Icon={<AiOutlineShoppingCart />}
          text={'Avançar'}
        />
      )}
    </>
  )
}

'use client'

// ReactJs
import React, { useEffect, ChangeEvent, FormEvent, Dispatch, SetStateAction } from 'react'

// Contexts
import { useAppState } from '@/contexts/dadosCompra'

// Components
import Button from '@/components/Button/Button'

// Data bases
import { products } from '../FormCarrinho/produtos'

// icons
import { BsArrowLeft, BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs'
import { BsWhatsapp } from 'react-icons/bs'
import { FiAlertTriangle } from 'react-icons/fi'

export default function FormDados() {
  const { valorTotal, clientData, setClientData, quantidade } = useAppState()

  const myphone: number = 5551981877876

  // Mostrar produtos selecionados
  const selectedProducts = products
    .map((produto) => ({
      produto,
      selectedQuantity: quantidade[produto.id] || 0,
    }))
    .filter((selectedProduct) => selectedProduct.selectedQuantity > 0) //fim

  // Resumo da compra para o link
  let productsSummary = selectedProducts
    .map((selectedProduct) => `${selectedProduct.produto.name} - Quantidade: ${selectedProduct.selectedQuantity}`)
    .join('%0A')
  if (selectedProducts.length === 0) {
    productsSummary = 'Nenhum produto.'
  }
  //fim

  // Formata o valor total
  const formattedValorTotal = valorTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }) //fim

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const whatsAppLink = `https://wa.me/${myphone}?text=Olá, eu gostaria de fazer um pedido!%0A*Cliente:*${' '}${
      clientData.name
    }%0A*Contato:*${' '}${clientData.phone}%0A%0A*Rua:*${' '}${clientData.street}${', '}${
      clientData.housenumber
    }%0A*Complemento:*${' '}${clientData.complement}%0A*Bairro:*${' '}${clientData.district}${' / '}${
      clientData.city
    }%0A*Pagamento:*${' '}${clientData.pay}%0A%0A*Informações Adicionais:*%0A${
      clientData.additional
    }%0A%0A*Produtos Selecionados:*%0A${productsSummary}%0A${formattedValorTotal}`

    window.open(whatsAppLink, '_blank')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Nome:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome."
            value={clientData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="phone">
          Telefone de contato:
          <input
            id="phone"
            type="number"
            name="phone"
            value={clientData.phone}
            onChange={handleChange}
            placeholder="(DDD) 9 9999-9999"
            required
          />
          <span
            style={{
              fontSize: '.7rem',
              color: 'red',
            }}
          >
            Digite apenas números. 11 números
          </span>
        </label>

        <label htmlFor="street">
          Nome da rua:
          <input
            type="text"
            id="street"
            name="street"
            placeholder="Digite o nome da sua rua."
            value={clientData.street}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="housenumber">
          Número da casa:
          <input
            type="number"
            id="housenumber"
            name="housenumber"
            placeholder="Digite o número da casa."
            value={clientData.housenumber}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="complement">
          Complemento:
          <br />
          <span style={{ fontSize: '.7rem' }}>Fundos, Casa 2, Bloco, etc...</span>
          <input
            type="text"
            id="complement"
            name="complement"
            placeholder="Digite o complemento, se houver."
            value={clientData.complement}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="district">
          Bairro:
          <input
            type="text"
            id="district"
            name="district"
            placeholder="Digite o nome do bairro."
            value={clientData.district}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="city">
          Cidade:
          <select id="city" name="city" value={clientData.city} onChange={handleChange} required>
            <option value="" style={{ display: 'none' }}>
              Selecione.
            </option>
            <option value="Guaíba-RS">Guaíba-RS</option>
          </select>
        </label>

        <label htmlFor="pay">
          Forma de pagamento:
          <select id="pay" name="pay" value={clientData.pay} onChange={handleChange} required>
            <option value="" style={{ display: 'none' }}>
              Selecione.
            </option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Pix">Pix</option>
            <option value="Débito">Débito</option>
            <option value="Crédito">Crédito</option>
          </select>
        </label>

        <label htmlFor="additional">
          Observações:
          <span style={{ fontSize: '.7rem' }}>
            • Pontos de referência
            <br />• Informações Adicionais
          </span>
          <textarea
            id="additional"
            name="additional"
            placeholder="Digite observações."
            value={clientData.additional}
            onChange={handleChange}
          />
        </label>

        {valorTotal > 0 ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            <h3>Resumo da Compra</h3>
            <ul>
              {selectedProducts.map((selectedProduct) => (
                <li key={selectedProduct.produto.id}>
                  {selectedProduct.produto.name} - Quantidade: {selectedProduct.selectedQuantity}
                </li>
              ))}
            </ul>
            <h3>Valor Total: {formattedValorTotal}</h3>
          </div>
        ) : (
          <div id="alerts">
            <div>
              <FiAlertTriangle stroke={'#d33100'} />
              Nenhum produto selecionado!
            </div>
          </div>
        )}

        <Button to={'/pedido'} Icon={<BsArrowLeft />} text={'Voltar'} />

        <button className="button" type="submit" disabled={clientData.city === '' || clientData.pay === ''}>
          <BsWhatsapp /> Fazer pedido
        </button>

        <div id="alerts">
          {clientData.city === '' && (
            <div>
              <FiAlertTriangle stroke={'#d33100'} />
              Selecione a cidade!
            </div>
          )}
          {clientData.pay === '' && (
            <div>
              <FiAlertTriangle stroke={'#d33100'} />
              Selecione a forma de pagamento!
            </div>
          )}
        </div>
      </form>
    </>
  )
}

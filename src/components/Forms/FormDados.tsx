'use client'

// ReactJs
import React, { useRef, useState, FormEvent } from 'react'

// Contexts / Types
import { useAppState, IclientData } from '@/contexts/dadosCompra'

// Components
import LinkButton from '@/components/Utils/LinkButton'
import ResumoCompra from '@/components/Utils/ResumoCompra'
import CustomDialog from '@/components/Utils/CustomDialog'

// icons
import { BsArrowLeft } from 'react-icons/bs'
import { BsWhatsapp } from 'react-icons/bs'
import { FiAlertTriangle } from 'react-icons/fi'

// functions
import { formatValues } from '@/functions/functions'

// *** //
export default function FormDados() {
  const {
    valorTotal,
    clientData,
    setClientData,
    selectedProducts,
    phoneWhatsApp
  } = useAppState()

  const [formatted, setFormatted] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState(false)

  // Seta os dados no state clientData
  function handleClientData(field: string, value: string) {
    setClientData({
      ...clientData,
      [field]: value
    })
    setFormatted(false)
  }

  // Remove espaços digitados
  function wordSplite(
    clientData: IclientData,
    setFormatted: (value: boolean) => void
  ): IclientData {
    const newData: IclientData = { ...clientData }
    for (const key in newData) {
      if (typeof newData[key] === 'string') {
        const word = newData[key]
          .split(/\s+/)
          .filter(word => word.trim() !== '')
        newData[key] = word.join(' ')
      }
    }
    setFormatted(true)
    return newData
  }

  // Formata o telefone
  function formatPhoneNumber(inputValue: string): void {
    let formattedNumber = inputValue.replace(/\D/g, '')

    const maxDigits = 11

    if (/^0/.test(formattedNumber)) {
      formattedNumber = formattedNumber.slice(1)
    }

    if (formattedNumber.length >= maxDigits) {
      formattedNumber = formattedNumber.slice(0, maxDigits)
    }
    if (formattedNumber) {
      formattedNumber = formattedNumber
        .replace(/^(\d)/, '($1')
        .replace(/^(\(\d{2})(\d)/, '$1) $2')
        .replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2-$3')
        .replace(/(\d{4})(\d{1})/, '$1-$2')
    }
    handleClientData('phone', formattedNumber)
  }

  //Abre/fecha a confirmação dos dados
  const handleYesClick = () => {
    setShowDialog(false)
    openWhatsAppLink()
    setFormatted(false)
  }

  const handleNoClick = () => {
    setShowDialog(false)
    setFormatted(false)
  }

  //Submit
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setClientData(wordSplite(clientData, setFormatted))

    setTimeout(() => {
      setShowDialog(true)
    }, 500)
  }

  //Envia os dados formatados para o WhatsAppLink
  let productsSummary = selectedProducts
    .map(
      selectedProduct =>
        `${selectedProduct.selectedQuantity.toString().padStart(2, '0')} ${
          selectedProduct.produto.name
        }`
    )
    .join('%0A')
  function openWhatsAppLink() {
    const whatsAppLink = `https://wa.me/${phoneWhatsApp}?text=NOVO PEDIDO!%0A%0A*Cliente:*${' '}${
      clientData.name
    }%0A*Contato:*${' '}${clientData.phone}%0A*Endereço:*${' '}${
      clientData.street
    }${', '}${clientData.housenumber}%0A*Compl.:*${' '}${
      clientData.complement || 'Não'
    }%0A*Bairro:*${' '}${clientData.district}${' - '}${
      clientData.city
    }%0A%0A*Informações Adicionais:*%0A${
      clientData.additional || 'Não'
    }%0A%0A*Produtos Selecionados:*%0A${productsSummary}%0A%0A*${formatValues(
      valorTotal
    )}${' - '}${clientData.pay}*`

    window.open(whatsAppLink, '_blank')
  } //fim

  return (
    <>
      <CustomDialog
        showDialog={showDialog}
        onYesClick={handleYesClick}
        onNoClick={handleNoClick}
      />
      <form onSubmit={onSubmit}>
        <label>
          Nome:
          <input
            value={clientData.name}
            placeholder='Nome'
            name='name'
            onChange={event => handleClientData('name', event.target.value)}
            required
          />
        </label>
        <label>
          Telefone de contato:
          <span style={{ fontSize: '.7rem' }}>• DDD requerido.</span>
          <input
            value={clientData.phone}
            type='text'
            inputMode='numeric'
            name='phone'
            placeholder='(99) 9 9999-9999'
            onChange={e => formatPhoneNumber(e.target.value)}
            required
          />
          {clientData.phone.length > 5 ? (
            <div>
              {clientData.phone.length < 14 && (
                <span className='required'>
                  <span style={{ color: 'orange' }}>Telefone incompleto</span>
                </span>
              )}
              {clientData.phone.length === 14 && (
                <span className='required'>
                  <span style={{ color: 'green' }}>Telefone fixo</span>
                </span>
              )}
              {clientData.phone.length > 14 && (
                <span className='required'>
                  <span style={{ color: 'green' }}>Telefone celular</span>
                </span>
              )}{' '}
            </div>
          ) : null}
        </label>
        <label>
          Nome da rua:
          <input
            value={clientData.street}
            name='street'
            placeholder='Endereço'
            onChange={event => handleClientData('street', event.target.value)}
            required
          />
        </label>
        <label>
          Número da casa:
          <input
            value={clientData.housenumber}
            type='number'
            name='housenumber'
            placeholder='Número da casa'
            onChange={event =>
              handleClientData('housenumber', event.target.value)
            }
            required
          />
        </label>
        <label>
          Complemento:
          <br />
          <span style={{ fontSize: '.7rem' }}>
            • Fundos, Casa 2, Bloco, etc...
          </span>
          <input
            value={clientData.complement}
            name='complement'
            placeholder='Complemento'
            onChange={event =>
              handleClientData('complement', event.target.value)
            }
          />
        </label>
        <label>
          Bairro:
          <input
            value={clientData.district}
            name='district'
            placeholder='Bairro'
            onChange={event => handleClientData('district', event.target.value)}
            required
          />
        </label>
        <label>
          Cidade:
          <select
            name='city'
            value={clientData.city}
            onChange={event => handleClientData('city', event.target.value)}
            required>
            <option
              value=''
              style={{ display: 'none' }}>
              Selecione
            </option>
            <option value='Guaíba/RS'>Guaíba/RS</option>
            <option value='Eld. do Sul/RS'>Eld. do Sul/RS</option>
          </select>
        </label>
        <label>
          Forma de pagamento:
          <select
            name='pay'
            value={clientData.pay}
            onChange={event => handleClientData('pay', event.target.value)}
            required>
            <option
              value=''
              style={{ display: 'none' }}>
              Selecione
            </option>
            <option value='Dinheiro'>Dinheiro</option>
            <option value='Pix'>Pix</option>
            <option value='Débito'>Débito</option>
            <option value='Crédito'>Crédito</option>
          </select>
        </label>
        <label>
          Observações:
          <span style={{ fontSize: '.7rem' }}>
            • Pontos de referência
            <br />• Informações Adicionais
          </span>
          <textarea
            value={clientData.additional}
            name='additional'
            placeholder='Observações adicionais'
            onChange={event =>
              handleClientData('additional', event.target.value)
            }
          />
        </label>

        <LinkButton
          to={'/produtos'}
          Icon={<BsArrowLeft />}
          text={'Voltar'}
        />

        {valorTotal === 0 && <ResumoCompra />}

        <div className='wrapper_button'>
          {valorTotal === 0 || clientData.phone.length < 14 ? (
            <button
              className='button'
              disabled>
              <BsWhatsapp /> Fazer Pedido
            </button>
          ) : (
            <button
              type='submit'
              className='button'>
              <BsWhatsapp /> Fazer pedido
            </button>
          )}
        </div>
      </form>
    </>
  )
}

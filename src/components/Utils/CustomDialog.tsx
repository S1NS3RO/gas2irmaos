import '@/styles/CustomDialog.scss'

// functions
import { formatValues } from '@/functions/functions'

//hooks
import { useAppState } from '@/contexts/dadosCompra'

//icons
import { BsArrowLeft, BsWhatsapp } from 'react-icons/bs'

//Components
import LinkButton from '@/components/Utils/LinkButton'

type ICustomDialogProps = {
  showDialog: boolean
  onYesClick: () => void
  onNoClick: () => void
}

export default function CustomDialog({
  showDialog,
  onYesClick,
  onNoClick
}: ICustomDialogProps) {
  const { clientData, valorTotal, selectedProducts } = useAppState()
  return (
    <div
      className='custom_dialog'
      style={{ display: showDialog ? 'flex' : 'none' }}>
      <div className='internal_box'>
        <h3>VERIFIQUE</h3>
        <div className='data'>
          <p>
            <strong>Cliente:</strong> {clientData.name}
          </p>
          <p>
            <strong>Contato:</strong>{' '}
            <span
              style={{
                color: 'rgb(245, 159, 11)',
                textDecoration: 'underline'
              }}>
              {clientData.phone}
            </span>
          </p>
          <p>
            <strong>Endereço:</strong> {clientData.street},{' '}
            {clientData.housenumber}
          </p>
          <p>
            <strong>Compl.:</strong> {clientData.complement || 'Não'}
          </p>
          <p>
            <strong>Bairro:</strong> {clientData.district}
            {' - '}
            {clientData.city}
          </p>
          <br />
          <p>
            <strong>Informações Adicionais:</strong>
          </p>
          <p>{clientData.additional || 'Não'}</p>
          <br />
          <p>
            <strong>Produtos Selecionados:</strong>
          </p>
          <ul>
            {selectedProducts.map(selectedProduct => (
              <li key={selectedProduct.produto.id}>
                {selectedProduct.selectedQuantity.toString().padStart(2, '0')}{' '}
                {selectedProduct.produto.name}
                {' - '}
                {formatValues(
                  selectedProduct.produto.price *
                    selectedProduct.selectedQuantity
                )}
              </li>
            ))}
          </ul>
        </div>
        <p className='total'>
          <strong>
            Total: {formatValues(valorTotal)}
            {' - '}
            {clientData.pay}
          </strong>
        </p>
        <div className='buttons'>
          <button
            className='button'
            onClick={onNoClick}>
            <BsArrowLeft /> Revisar
          </button>
          <LinkButton
            to={'/'}
            onClick={onYesClick}
            Icon={<BsWhatsapp />}
            text={'Avançar'}
          />
        </div>
      </div>
    </div>
  )
}

import { Stack } from '@mui/material'
import { BaseContainer, BaseSurface } from '../Base/Base'
import CrudButtons from '../Buttons/CrudButtons'
import Header from '../Header'
import SearchableDocumentList from '../SearchableDocumentList'

export default function UserManagement() {
  return (
    <BaseSurface>
      <BaseContainer direction="column" spacing="1.25rem">
        <Header title="Usuarios">
          <CrudButtons />
        </Header>
        <Form />
      </BaseContainer>
    </BaseSurface>
  )
}

function Form() {
  return (
    <Stack direction="row" spacing="2.5rem">
      <SearchableDocumentList title="Usuarios" />
    </Stack>
  )
}

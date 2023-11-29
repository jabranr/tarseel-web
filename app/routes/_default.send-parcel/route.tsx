import { Form } from '@remix-run/react';
import InputSelect from '~/components/InputSelect';
import InputText from '~/components/InputText';

export default function SendParcel() {
  return (
    <Form
      action="/send-parcel"
      method="post"
      className="max-w-sm mx-auto [&>*+*]:mt-8"
    >
      <InputSelect label="Where would you like to send?">
        <InputSelect.Option value="select-an-option" label="Select an option" />
      </InputSelect>
      <InputText name="parcelType" label="What would you like to send?" />
    </Form>
  );
}

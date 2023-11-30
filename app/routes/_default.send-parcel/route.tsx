import { Form, useLoaderData } from '@remix-run/react';
import InputSelect from '~/components/InputSelect';
import InputText from '~/components/InputText';
import InputTextArea from '~/components/InputTextArea';
import { loader } from './loader';
import {
  IconArrowRight,
  IconCurrencyPound,
  IconRulerMeasure,
  IconWeight
} from '@tabler/icons-react';
import Button from '~/components/Button';

export { loader };
export default function SendParcel() {
  const { parcelTypes, deliverBy } = useLoaderData<typeof loader>();

  return (
    <Form
      action="/send-parcel"
      method="post"
      className="max-w-sm mx-auto [&>*+*]:mt-8"
    >
      <InputSelect label="What is the type of parcel?" defaultValue="" required>
        {parcelTypes.map((parcelType) => (
          <InputSelect.Option
            key={parcelType._id}
            value={parcelType.code}
            label={parcelType.name}
          />
        ))}
      </InputSelect>
      <InputSelect
        label="Where do you want to send it?"
        defaultValue=""
        required
      >
        <InputSelect.Option value="AU" label="Australia" />
        <InputSelect.Option value="NZ" label="New Zealand" />
        <InputSelect.Option value="IN" label="India" />
        <InputSelect.Option value="PK" label="Pakistan" />
      </InputSelect>
      <InputSelect
        label="When do you want it delivered?"
        defaultValue=""
        required
      >
        {deliverBy.map((deliverBy) => (
          <InputSelect.Option
            key={deliverBy._id}
            value={deliverBy.code}
            label={deliverBy.text}
          />
        ))}
      </InputSelect>
      <InputText name="value" label="Approx, how much is it worth?" required>
        <IconCurrencyPound className="w-5 h-5" />
      </InputText>
      <InputText name="budget" label="What is your rough budget?" required>
        <IconCurrencyPound className="w-5 h-5" />
      </InputText>

      <InputText
        name="weight"
        label="How heavy is it?"
        placeholder="weight (kg)"
        required
      >
        <IconWeight className="w-5 h-5" />
      </InputText>

      <InputText.Group label="What is the dimension?">
        <InputText name="width" placeholder="width (cm)">
          <IconRulerMeasure className="w-5 h-5" />
        </InputText>
        <InputText name="height" placeholder="height (cm)" />
        <InputText name="depth" placeholder="depth (cm)" />
      </InputText.Group>

      <InputTextArea name="description" label="Description" />
      <Button>
        Next <IconArrowRight />
      </Button>
    </Form>
  );
}

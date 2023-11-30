import { Form, useActionData, useLoaderData } from '@remix-run/react';
import InputSelect from '~/components/InputSelect';
import InputText from '~/components/InputText';
import InputTextArea from '~/components/InputTextArea';
import { loader } from './loader';
import { action } from './action';
import {
  IconArrowRight,
  IconCurrencyPound,
  IconExclamationCircle,
  IconRulerMeasure,
  IconWeight
} from '@tabler/icons-react';
import Button from '~/components/Button';

export { loader, action };
export default function SendParcel() {
  const { parcelTypes, deliverBy } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <Form
      action="/send-parcel"
      method="POST"
      className="max-w-sm mx-auto flex flex-col space-y-8"
    >
      {actionData?.formError && (
        <p className="text-sm text-red-800 font-medium flex items-center">
          <IconExclamationCircle className="w-5 h-5 mr-1" />
          {actionData?.formError}
        </p>
      )}
      <InputSelect
        name="type"
        label="What is the type of parcel?"
        defaultValue=""
        required
      >
        {parcelTypes.map((parcelType) => (
          <InputSelect.Option
            key={parcelType._id}
            value={parcelType.code}
            label={parcelType.name}
          />
        ))}
      </InputSelect>
      <InputSelect
        name="destination"
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
        name="deliverBy"
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
      <InputText
        name="value"
        label="Approx, how much is it worth?"
        required
        type="number"
        inputMode="numeric"
      >
        <IconCurrencyPound className="w-5 h-5" />
      </InputText>
      <InputText
        name="budget"
        label="What is your rough budget?"
        required
        type="number"
        inputMode="numeric"
      >
        <IconCurrencyPound className="w-5 h-5" />
      </InputText>

      <InputText
        name="weight"
        label="How heavy is it?"
        placeholder="weight (kg)"
        required
        type="number"
        inputMode="numeric"
      >
        <IconWeight className="w-5 h-5" />
      </InputText>

      <InputText.Group label="What is the dimension?">
        <InputText
          name="width"
          placeholder="width (cm)"
          type="number"
          inputMode="numeric"
        >
          <IconRulerMeasure className="w-5 h-5" />
        </InputText>
        <InputText
          name="height"
          placeholder="height (cm)"
          type="number"
          inputMode="numeric"
        />
        <InputText
          name="depth"
          placeholder="depth (cm)"
          type="number"
          inputMode="numeric"
        />
      </InputText.Group>

      <InputTextArea name="description" label="Description" />
      <InputText type="hidden" name="origin" value="GB" />
      <Button type="submit" fill>
        Next <IconArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </Form>
  );
}

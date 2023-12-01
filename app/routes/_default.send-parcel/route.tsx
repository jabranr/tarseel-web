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
import { useForm } from '@conform-to/react';

export { loader, action };
export default function SendParcel() {
  const { parcelTypes, deliverBy } = useLoaderData<typeof loader>();
  const lastSubmission = useActionData<typeof action>();
  const [form, fields] = useForm({ lastSubmission, shouldValidate: 'onBlur' });

  return (
    <Form
      action="/send-parcel"
      method="POST"
      className="max-w-sm mx-auto flex flex-col space-y-8"
      {...form.props}
    >
      <InputSelect
        name="type"
        label="What is the type of parcel?"
        defaultValue={fields.type.defaultValue || ''}
        error={fields.type.error}
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
        defaultValue={fields.destination.defaultValue || ''}
        error={fields.destination.error}
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
        defaultValue={fields.deliverBy.defaultValue || ''}
        error={fields.deliverBy.error}
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
        min={1}
        defaultValue={fields.value.defaultValue}
        error={fields.value.error}
      >
        <IconCurrencyPound className="w-5 h-5" />
      </InputText>
      <InputText
        name="budget"
        label="What is your rough budget?"
        required
        type="number"
        inputMode="numeric"
        min={1}
        defaultValue={fields.budget.defaultValue}
        error={fields.budget.error}
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
        min={1}
        defaultValue={fields.weight.defaultValue}
        error={fields.weight.error}
      >
        <IconWeight className="w-5 h-5" />
      </InputText>

      <InputText.Group label="What is the dimension?">
        <InputText
          name="width"
          placeholder="width (cm)"
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={fields.width.defaultValue}
          error={fields.width.error}
        >
          <IconRulerMeasure className="w-5 h-5" />
        </InputText>
        <InputText
          name="height"
          placeholder="height (cm)"
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={fields.height.defaultValue}
          error={fields.height.error}
        />
        <InputText
          name="depth"
          placeholder="depth (cm)"
          type="number"
          inputMode="numeric"
          min={1}
          defaultValue={fields.depth.defaultValue}
          error={fields.depth.error}
        />
      </InputText.Group>

      <InputTextArea
        name="description"
        label="Description"
        defaultValue={fields.description.defaultValue}
        error={fields.description.error}
      />
      <InputText type="hidden" name="origin" value="GB" />
      <Button type="submit" fill>
        Next <IconArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </Form>
  );
}

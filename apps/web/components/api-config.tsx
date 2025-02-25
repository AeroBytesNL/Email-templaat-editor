'use client';

// @ts-ignore
import { useFormStatus } from 'react-dom';
import { Cog, Loader2, PlugZap } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { shallow } from 'zustand/shallow';
import { useServerAction } from '@/utils/use-server-action';
import { envelopeConfigAction } from '@/actions/config';
import { useEditorContext } from '@/stores/editor-store';
import { catchActionError } from '@/actions/error';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface SubmitButtonProps {
  disabled?: boolean;
}

function SubmitButton(props: SubmitButtonProps) {
  const { disabled } = props;
  const { pending } = useFormStatus();

  return (
    <button
      className="flex h-10 items-center justify-center rounded-md bg-black px-2 py-1 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled || pending}
      type="submit"
    >
      {pending ? (
        <Loader2 className="mr-1 inline-block animate-spin" size={16} />
      ) : (
        <PlugZap className="mr-1 inline-block" size={16} />
      )}
      Save Changes
    </button>
  );
}

export function ApiConfiguration() {
  const { apiKey, endpoint, setApiKey, setEndpoint } = useEditorContext((s) => {
    return {
      apiKey: s.apiKey,
      endpoint: s.endpoint,
      setApiKey: s.setApiKey,
      setEndpoint: s.setEndpoint,
    };
  }, shallow);

  const [isOpen, setIsOpen] = useState(false);

  const [action, isPending] = useServerAction(
    catchActionError(envelopeConfigAction),
    (result) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- Result is always there
      const { error, data } = result!;
      if (error) {
        toast.error(error.message || 'Something went wrong');
        return;
      }

      toast.success('Envelope configuration saved');
      setApiKey(data.apiKey);
      setEndpoint(data.endpoint);
      setIsOpen(false);
    }
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-md border bg-gray-100 text-black duration-200 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
        >
          <Cog className="inline-block" size={16} />
        </button>
      </DialogTrigger>
    </Dialog>
  );
}

export function ToastError({
  data,
}: {
  // data: { status: string; detail: string; error: string; instance: string; path: string };
  data: ProblemDetailsDTO;
}) {
  return (
    <div className="flex flex-col">
      {data.status && (
        <div className="flex">
          <span className="text-nowrap font-semibold">Status:</span>&nbsp;
          {data.status}
        </div>
      )}
      {data.title && (
        <div className="flex">
          <span className="text-nowrap font-semibold">Title:</span>&nbsp;
          {data.title}
        </div>
      )}
      {data.detail && (
        <div className="flex">
          <span className="text-nowrap font-semibold">Details:</span>&nbsp;
          {data.detail}
        </div>
      )}
      {data.error && (
        <div className="flex">
          <span className="text-nowrap font-semibold">Error:</span>&nbsp;
          {data.error}
        </div>
      )}
      {data.instance && (
        <div className="flex">
          <span className="text-nowrap font-semibold">Instance:</span>&nbsp;
          {data.instance}
        </div>
      )}
      {data.path && (
        <div className="flex">
          <span className="text-nowrap font-semibold">Path:</span>&nbsp;
          {data.path}
        </div>
      )}
      {data.message && (
        <div className="flex">
          <span className="text-nowrap font-semibold">Message:</span>&nbsp;
          {data.message}
        </div>
      )}
    </div>
  );
}

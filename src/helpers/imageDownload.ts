export const imageDownload = (stageReferenceState: any) => {
  console.log("handleDownload State: ", stageReferenceState);
  if (stageReferenceState) {
    const uri = stageReferenceState.toDataURL();
    const link = document.createElement("a");
    link.download = "generated_image.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

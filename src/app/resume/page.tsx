// export default function ResumePage() {
//   return (
//     <div className="h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
//       <iframe
//           src="/Khairaj Student CV Resume.pdf"
//           className="w-full h-full"
//           title="Khairaj Ram Resume"
//         ></iframe>
//     </div>
//   );
// }



export default function ResumePage() {
  return (
    <div className="min-h-screen min-w-full h-screen bg-gray-50">

      <div className="min-w-full w-full min-h-full h-full h-[90vh] ">
        <iframe
          src="/Khairaj Student CV Resume.pdf"
          className="w-full h-full"
          title="Khairaj Ram Resume"
        ></iframe>
      </div>
    </div>
  );
}

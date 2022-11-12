<Col lg={6} md={12} className="mb-2">
<p>
  <label>
    Enter{" "}
    <CustomToolTip message={`Remember your rent payment can be flexible on RENTO. You may decide to pay the \u20A6${amountFormat(rentDataDetail?.propertyAmount)} annual fee outrightly or pay at least 50% (\u20A6${amountFormat(rentDataDetail?.propertyAmount / 2)}) of the annual fee and complete the rest over the next six months.`} >
    <span className="text-primary">
        initial payment
      </span>
    </CustomToolTip>
  </label>
  <input
    required
    type="number"
    value={initialPayment}
    onChange={(e)=>setInitialPayment(e.target.value)}
    placeholder={`\u20A6${amountFormat(rentDataDetail?.propertyAmount / 2)} - \u20A6${amountFormat(rentDataDetail?.propertyAmount)}`}
  />
</p>
</Col>
{step === 2 && (
<>
<Col lg={6} md={12} className="mb-2">
<p>
  <label>
   Enter Your bvnNumber
  </label>
  <input
    type="number"
    value={bvnNumber}
    onChange={(e)=>setBvnNumber(e.target.value)}
    placeholder="Bank Verification Number"
    required
  />
</p>
</Col>
<Col lg={6} md={12} className="mb-2">
<p>
  <label>
   Partner Company
  </label>
  <input
    type="text"
    onChange={(e) => setPartnerCompany(e.target.value)}
    value={partnerCompany}
    placeholder="Lopo Inc."

  />
</p>
</Col>
</>
)}
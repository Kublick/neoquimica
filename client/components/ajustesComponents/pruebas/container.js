const container = () => {
  return (
    <div>
      	<dive className="grid grid-cols-2 gap-4">
							<div className="grid col-span-1">
							
		
				

							

							
						
				
					
						
					
							</div>
							<div />
							<div className="grid col-span-2">
						

					
						
							</div>
							<div>
								<div className="flex justify-betweenmt-8">
									<Button
										color="red"
										buttonType="filled"
										size="regular"
										rounded={false}
										iconOnly={false}
										ripple="light"
										className="mx-4"
										onClick={(e) => {
											resetForm();
											setEditData(null);
											setShowModal(false);
										}}
										type="button"
									>
										Cancelar
									</Button>
									<Button
										color="lightBlue"
										buttonType="filled"
										size="regular"
										rounded={false}
										iconOnly={false}
										ripple="light"
										className="mx-4"
										type="button"
										onClick={() => setNormalidad(true)}
									>
										Siguiente
									</Button>
								</div>
							</div>
						</dive>
    </div>
  )
}

export default container

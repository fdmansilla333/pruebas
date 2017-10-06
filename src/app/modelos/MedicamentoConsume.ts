export class MedicamentoConsume {

  constructor(
    public codigo: Number, 
    public atencion: Number, 
    public producto: Number, 
    public observacion: String = '', 
    public presentacion:String, 
    public dosificacion:String, 
    public nombre:string) {}
}

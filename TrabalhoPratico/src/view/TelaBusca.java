/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package view;

import java.awt.Graphics;
import java.util.ArrayList;
import javax.swing.JLabel;

/**
 *
 * @author guilh
 */
public class TelaBusca extends javax.swing.JFrame {
    int[][] matriz = {
        {3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4},
        {3,1,0,3,1,3,1,3,1,1,1,1,1,1,1,4,4,4,4,4,4,4,2,2,-4,2,2,4,4,4,4,4,4,2,2,2,2,4,4,4,4,4},
        {3,1,1,3,1,1,1,3,1,3,1,1,1,1,1,1,4,4,4,4,4,2,2,2,2,2,2,2,4,4,4,4,2,2,2,2,2,2,4,4,4,4},
        {3,1,3,3,1,3,1,3,1,3,1,1,3,1,1,1,1,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4},
        {3,1,1,1,1,3,1,3,1,3,1,1,3,1,1,1,1,4,2,4,4,2,2,2,2,2,2,2,4,4,4,4,2,2,2,2,2,2,4,4,4,4},
        {3,1,3,3,1,3,1,3,1,3,1,3,3,3,1,1,1,4,2,4,4,4,2,2,2,2,2,4,4,4,4,5,4,2,2,2,2,4,5,4,4,4},
        {3,1,3,3,1,3,1,1,1,3,1,1,1,1,1,1,1,4,2,4,4,4,4,4,4,4,4,4,4,4,4,5,4,4,4,4,4,4,5,4,4,4},
        {3,1,3,3,3,3,1,3,3,3,1,1,1,1,1,1,1,4,2,4,4,4,4,4,4,4,4,4,4,4,4,5,4,4,4,4,4,4,5,4,1,4},
        {3,1,1,3,1,1,1,1,1,3,1,1,5,1,1,1,1,4,2,2,2,2,2,2,2,2,2,2,2,4,4,5,4,4,4,4,4,4,5,4,1,4},
        {3,3,3,3,1,3,3,3,1,1,1,5,5,5,1,1,1,4,2,4,4,4,4,4,2,4,4,4,2,4,4,5,4,4,4,4,4,4,5,4,1,4},
        {3,1,1,3,1,1,1,1,1,1,5,5,5,5,5,1,1,4,4,4,3,3,3,4,4,4,3,3,3,3,3,5,1,1,4,4,1,1,5,1,1,4},
        {3,1,1,3,1,1,3,1,1,1,1,5,5,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,1,1,4},
        {3,1,1,3,1,1,3,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,3,1,1,1,1,1,3,1,4},
        {3,1,1,3,1,1,3,1,1,1,1,1,1,1,1,1,1,3,3,3,1,1,1,3,3,3,3,1,1,1,5,1,1,1,1,1,1,3,1,3,1,4},
        {3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,3,1,3,1,3,3,1,3,1,4},
        {3,1,3,3,3,3,3,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1,1,4},
        {3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,5,5,5,5,5,5,5,5,5,1,1,1,1,1,4,4,4,4,4,4,4,4,4,4},
        {3,1,1,1,1,1,1,1,1,5,1,1,3,1,3,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,5,1,4,2,2,2,2,2,2,-3,2,4},
        {3,1,3,1,1,3,1,1,1,5,1,1,1,1,1,1,1,5,1,3,1,1,1,1,3,1,5,5,5,5,5,1,4,2,4,2,2,4,2,2,2,4},
        {3,1,3,1,1,3,1,1,1,5,1,1,3,1,3,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,4,2,4,4,4,4,4,4,4,4},
        {3,1,3,1,1,3,1,1,1,5,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,1,1,4,1,4,2,2,2,2,2,2,2,2,4},
        {3,1,3,1,1,3,1,1,1,5,1,3,3,3,3,1,1,5,1,3,1,1,1,1,3,1,1,1,1,1,4,1,4,2,4,4,4,4,2,4,4,4},
        {3,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,5,1,4,1,4,1,4,2,2,2,2,2,2,2,2,4},
        {3,1,1,1,1,1,1,1,1,1,1,3,3,3,3,1,1,5,5,5,5,1,1,5,5,5,5,1,4,1,4,1,4,4,4,2,2,4,4,4,4,4},
        {3,3,3,3,3,3,3,1,1,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,5,1,4,1,4,1,1,1,1,1,1,1,1,1,1,4},
        {3,3,3,3,3,3,1,1,3,3,3,3,3,1,3,3,3,3,1,3,3,3,1,1,1,1,5,1,4,1,1,1,1,1,1,1,1,1,1,1,1,4},
        {3,1,3,1,3,1,1,1,3,3,3,3,1,1,1,3,3,3,1,3,3,3,1,1,1,1,5,1,4,1,1,1,4,4,4,4,4,4,4,4,4,4},
        {4,1,1,1,3,1,1,1,3,3,3,1,1,1,1,1,3,3,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,4,1,1,1,1,1,4},
        {4,1,1,1,3,1,1,1,3,3,3,3,1,1,1,3,3,3,1,3,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,4,1,1,1,1,1,4},
        {4,1,1,1,1,1,1,1,1,3,3,3,3,1,3,3,3,1,1,3,1,1,1,1,1,1,5,5,5,1,5,5,5,5,1,4,1,4,4,4,4,4},
        {4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,4},
        {4,4,4,4,4,4,4,4,4,1,1,1,1,4,4,4,4,4,4,4,1,1,4,4,4,4,1,1,1,1,1,1,1,5,4,4,4,4,4,4,1,4},
        {4,2,2,2,2,,2,2,4,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,5,4,4,4,4,4,4,4,4},
        {4,2,4,4,2,2,2,2,4,1,1,1,1,4,1,1,1,1,1,1,1,1,3,1,1,4,1,1,5,5,5,5,5,5,5,5,4,4,5,5,5,4},
        {4,2,4,4,2,2,2,2,4,1,1,1,1,4,1,3,1,1,5,5,1,1,3,1,1,4,1,1,5,5,4,5,5,5,5,5,4,4,5,5,5,4},
        {4,2,2,2,2,2,2,2,4,1,1,4,1,4,1,1,1,1,5,5,1,1,3,1,1,4,1,1,5,5,5,5,4,4,5,5,4,4,5,5,5,4},
        {4,2,2,2,2,2,2,2,4,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,5,5,5,5,4,4,5,5,4,4,5,5,5,4},
        {4,2,2,2,2,2,2,4,4,4,4,4,1,1,3,1,1,1,1,1,3,3,3,1,1,4,1,1,5,5,5,5,5,5,5,5,4,4,5,5,5,4},
        {4,2,2,2,2,2,2,2,2,4,4,4,1,1,3,1,5,5,5,1,1,3,1,1,1,4,1,1,5,5,5,5,5,5,5,5,4,4,5,5,5,4},
        {4,2,2,2,2,2,2,2,2,4,4,4,1,1,3,1,1,1,1,1,1,3,1,1,1,4,1,1,5,5,5,5,5,5,5,5,5,5,5,5,5,4},
        {4,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,4},
        {4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4}
    };
    /*
    Terreno: 
        Grama: 1
        Areia: 2
        Floresta: 3
        Montanha: 4
        Agua: 5
    Objetivo: 0
    Link: -1
    amuleto verde: -2
    amuleto azul: -3
    amuleto vermelho: -4
    */
    public TelaBusca() {
        initComponents();
    }
    static int linhas = 42;
    static int colunas = 42;
    static int grama = 10;
    static int areia = 20;
    static int floresta = 100;
    static int montanha = 150;
    static int agua = 180;
    boolean amuletoVerde = false;
    boolean amuletoAzul = false;
    boolean amuletoVermelho = false;
    ArrayList<ArrayList> visitados = new ArrayList<ArrayList>();
    
    int heuristica(int linhaAtual, int colunaAtual, String objetivo) {
        int linhaObjetivo = 0, colunaObjetivo = 0;
        if(objetivo == "espada"){
            linhaObjetivo = 1;
            colunaObjetivo = 2;
        } else if(objetivo == "amuleto azul") {
            linhaObjetivo = 17;
            colunaObjetivo = 39;
        } else if(objetivo == "amuleto verde") {
            linhaObjetivo = 32;
            colunaObjetivo = 5;
        } else if(objetivo == "amuleto vermelho") {
            linhaObjetivo = 1;
            colunaObjetivo = 24;
        }
        int distanciaLinha = 0, distanciaColuna = 0;
        if(linhaAtual == linhaObjetivo) {
           distanciaLinha = 0;
        } else if(linhaAtual<linhaObjetivo){
            distanciaLinha = linhaObjetivo - linhaAtual;
        } else if(linhaAtual>linhaObjetivo) {
            distanciaLinha = linhaAtual - linhaObjetivo;
        }
        if(colunaAtual == colunaObjetivo) {
           distanciaColuna = 0;
        } else if(colunaAtual<colunaObjetivo){
            distanciaColuna = colunaObjetivo - colunaAtual;
        } else if(colunaAtual>colunaObjetivo) {
            distanciaColuna = colunaAtual - colunaObjetivo;
        }
        return distanciaLinha + distanciaColuna;
    }
    
    void buscaAmuletoAzul(int linha, int coluna) {
        int cima = 9999, baixo = 9999, esquerda = 9999, direita = 9999;
        if(linha>0) {
            cima = heuristica(linha - 1, coluna, "amuleto azul");
            if(matriz[linha-1][coluna]==-3) {
                
            } else if(matriz[linha-1][coluna]==1) {
                cima = cima + grama;
            } else if(matriz[linha-1][coluna]==2){
                cima = cima + areia;
            } else if(matriz[linha-1][coluna]==3){
                cima = cima + floresta;
            } else if(matriz[linha-1][coluna]==4){
                cima = cima + montanha;
            } else if(matriz[linha-1][coluna]==5){
                cima = cima + agua;
            }
        }
        if(linha<41){
            baixo = heuristica(linha + 1, coluna, "amuleto azul");
            if(matriz[linha+1][coluna]==-3) {
                
            } else if(matriz[linha+1][coluna]==1) {
                baixo = baixo + grama;
            } else if(matriz[linha+1][coluna]==2){
                baixo = baixo + areia;
            } else if(matriz[linha+1][coluna]==3){
                baixo = baixo + floresta;
            } else if(matriz[linha+1][coluna]==4){
                baixo = baixo + montanha;
            } else if(matriz[linha+1][coluna]==5){
                baixo = baixo + agua;
            }
        }
        if(coluna>0) {
            esquerda = heuristica(linha, coluna - 1, "amuleto azul");
            if(matriz[linha][coluna-1]==-3) {
                
            } else if(matriz[linha][coluna-1]==1) {
                esquerda = esquerda + grama;
            } else if(matriz[linha][coluna-1]==2){
                esquerda = esquerda + areia;
            } else if(matriz[linha][coluna-1]==3){
                esquerda = esquerda + floresta;
            } else if(matriz[linha][coluna-1]==4){
                esquerda = esquerda + montanha;
            } else if(matriz[linha][coluna-1]==5){
                esquerda = esquerda + agua;
            }
        }
        if(coluna<41) {
            direita = heuristica(linha, coluna + 1, "amuleto azul");
            if(matriz[linha][coluna+1]==-3) {
                
            } else if(matriz[linha][coluna+1]==1) {
                direita = direita + grama;
            } else if(matriz[linha][coluna+1]==2){
                direita = direita + areia;
            } else if(matriz[linha][coluna+1]==3){
                direita = direita + floresta;
            } else if(matriz[linha][coluna+1]==4){
                direita = direita + montanha;
            } else if(matriz[linha][coluna+1]==5){
                direita = direita + agua;
            }
        }
        if(cima<baixo){
            
        }
        
    }
    
    void buscaAmuletoVerde(int linha, int coluna) {
        
    }
    
    void buscaAmuletoVermelho(int linha, int coluna) {
        
    }
    
    void iniciaBusca(int linhaInicial, int colunaInicial) {
        int distanciaAzul = 0, distanciaVerde = 0, distanciaVermelho = 0, menorValor;
        String objetivoInicial;
        distanciaAzul = heuristica(linhaInicial, colunaInicial, "amuleto azul");
        distanciaVerde = heuristica(linhaInicial, colunaInicial, "amuleto verde");
        distanciaVermelho = heuristica(linhaInicial, colunaInicial, "amuleto vermelho");
        menorValor = distanciaAzul;
        objetivoInicial = "amuleto azul";
        if(menorValor > distanciaVerde) {
            menorValor = distanciaVerde;
            objetivoInicial = "amuleto verde";
        }
        if(menorValor > distanciaVermelho){
            menorValor = distanciaVermelho;
            objetivoInicial = "amuleto vermelho";
        }
        
    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        jFrame1 = new javax.swing.JFrame();
        jFrame2 = new javax.swing.JFrame();
        jMenu1 = new javax.swing.JMenu();
        jPanel1 = new javax.swing.JPanel();
        jLabel1 = new javax.swing.JLabel();
        linhaInput = new javax.swing.JSpinner();
        jLabel2 = new javax.swing.JLabel();
        colunaInput = new javax.swing.JSpinner();
        custoOutput = new javax.swing.JLabel();
        buscaButton = new javax.swing.JButton();
        jPanel2 = new javax.swing.JPanel();

        javax.swing.GroupLayout jFrame1Layout = new javax.swing.GroupLayout(jFrame1.getContentPane());
        jFrame1.getContentPane().setLayout(jFrame1Layout);
        jFrame1Layout.setHorizontalGroup(
            jFrame1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 400, Short.MAX_VALUE)
        );
        jFrame1Layout.setVerticalGroup(
            jFrame1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 300, Short.MAX_VALUE)
        );

        javax.swing.GroupLayout jFrame2Layout = new javax.swing.GroupLayout(jFrame2.getContentPane());
        jFrame2.getContentPane().setLayout(jFrame2Layout);
        jFrame2Layout.setHorizontalGroup(
            jFrame2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 400, Short.MAX_VALUE)
        );
        jFrame2Layout.setVerticalGroup(
            jFrame2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 300, Short.MAX_VALUE)
        );

        jMenu1.setText("jMenu1");

        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);

        jLabel1.setText("Digite a linha inicial");

        jLabel2.setText("Digite a coluna inicial");

        custoOutput.setText("Custo: 0");

        buscaButton.setText("Iniciar Busca");
        buscaButton.addActionListener(new java.awt.event.ActionListener() {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                buscaButtonActionPerformed(evt);
            }
        });

        javax.swing.GroupLayout jPanel2Layout = new javax.swing.GroupLayout(jPanel2);
        jPanel2.setLayout(jPanel2Layout);
        jPanel2Layout.setHorizontalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 716, Short.MAX_VALUE)
        );
        jPanel2Layout.setVerticalGroup(
            jPanel2Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 699, Short.MAX_VALUE)
        );

        javax.swing.GroupLayout jPanel1Layout = new javax.swing.GroupLayout(jPanel1);
        jPanel1.setLayout(jPanel1Layout);
        jPanel1Layout.setHorizontalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(219, 219, 219)
                        .addComponent(buscaButton))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addGap(47, 47, 47)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
                            .addComponent(jLabel2)
                            .addComponent(jLabel1))
                        .addGap(18, 18, 18)
                        .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
                            .addComponent(linhaInput, javax.swing.GroupLayout.PREFERRED_SIZE, 54, javax.swing.GroupLayout.PREFERRED_SIZE)
                            .addComponent(colunaInput, javax.swing.GroupLayout.PREFERRED_SIZE, 54, javax.swing.GroupLayout.PREFERRED_SIZE))
                        .addGap(468, 468, 468)
                        .addComponent(custoOutput))
                    .addGroup(jPanel1Layout.createSequentialGroup()
                        .addContainerGap()
                        .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)))
                .addContainerGap(23, Short.MAX_VALUE))
        );
        jPanel1Layout.setVerticalGroup(
            jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(jPanel1Layout.createSequentialGroup()
                .addContainerGap()
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel1)
                    .addComponent(linhaInput, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                    .addComponent(custoOutput))
                .addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
                .addGroup(jPanel1Layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
                    .addComponent(jLabel2)
                    .addComponent(colunaInput, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
                .addGap(19, 19, 19)
                .addComponent(buscaButton)
                .addGap(18, 18, 18)
                .addComponent(jPanel2, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
                .addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE))
        );

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
        getContentPane().setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                .addContainerGap(28, Short.MAX_VALUE)
                .addComponent(jPanel1, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addComponent(jPanel1, javax.swing.GroupLayout.PREFERRED_SIZE, javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
        );

        pack();
    }// </editor-fold>//GEN-END:initComponents
    
    
    
    private void buscaButtonActionPerformed(java.awt.event.ActionEvent evt) {//GEN-FIRST:event_buscaButtonActionPerformed
        //custoOutput.setText(linhaInput.getValue().toString());
        if(((Integer) linhaInput.getValue() < 0 || (Integer) linhaInput.getValue() > 41) || ((Integer) colunaInput.getValue() < 0 || (Integer) colunaInput.getValue() > 41)){
          
        } else {
            iniciaBusca((Integer) linhaInput.getValue(), (Integer) colunaInput.getValue());
        }    
        
    }//GEN-LAST:event_buscaButtonActionPerformed

    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {
        /* Set the Nimbus look and feel */
        //<editor-fold defaultstate="collapsed" desc=" Look and feel setting code (optional) ">
        /* If Nimbus (introduced in Java SE 6) is not available, stay with the default look and feel.
         * For details see http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html 
         */
        try {
            for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    javax.swing.UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (ClassNotFoundException ex) {
            java.util.logging.Logger.getLogger(TelaBusca.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (InstantiationException ex) {
            java.util.logging.Logger.getLogger(TelaBusca.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (IllegalAccessException ex) {
            java.util.logging.Logger.getLogger(TelaBusca.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        } catch (javax.swing.UnsupportedLookAndFeelException ex) {
            java.util.logging.Logger.getLogger(TelaBusca.class.getName()).log(java.util.logging.Level.SEVERE, null, ex);
        }
        //</editor-fold>
        //</editor-fold>
        
        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new TelaBusca().setVisible(true);
            }
        });
    }

    // Variables declaration - do not modify//GEN-BEGIN:variables
    private javax.swing.JButton buscaButton;
    private javax.swing.JSpinner colunaInput;
    private javax.swing.JLabel custoOutput;
    private javax.swing.JFrame jFrame1;
    private javax.swing.JFrame jFrame2;
    private javax.swing.JLabel jLabel1;
    private javax.swing.JLabel jLabel2;
    private javax.swing.JMenu jMenu1;
    private javax.swing.JPanel jPanel1;
    private javax.swing.JPanel jPanel2;
    private javax.swing.JSpinner linhaInput;
    // End of variables declaration//GEN-END:variables
}
